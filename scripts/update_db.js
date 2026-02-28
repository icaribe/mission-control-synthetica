const fs = require('fs');
const path = require('path');
const db = require('../db/db');

// Helper to get or create agent
async function getOrCreateAgent(name) {
  const res = await db.query('SELECT id FROM agents WHERE name = $1', [name]);
  if (res.rowCount > 0) return res.rows[0].id;
  const insert = await db.query('INSERT INTO agents (name, status) VALUES ($1, $2) RETURNING id', [name, 'active']);
  return insert.rows[0].id;
}

// Upsert a task based on title (unique constraint)
async function upsertTask(task, agentId) {
  const result = await db.query(
    `INSERT INTO tasks (title, description, status, priority, deadline, agent_owner)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (title) DO NOTHING
     RETURNING id`,
    [
      task.title,
      task.notes || null,
      task.status,
      task.priority || null,
      task.deadline || null,
      agentId,
    ]
  );
  return result.rows[0].id;
}

async function main() {
  const tasksPath = path.join(__dirname, '..', 'memory', 'tasks.json');
  const raw = fs.readFileSync(tasksPath, 'utf8');
  const data = JSON.parse(raw);

  for (const t of data.tasks) {
    const ownerName = t.assigned_to || 'unknown';
    const agentId = await getOrCreateAgent(ownerName);
    const taskId = await upsertTask(t, agentId);
    // Log an update event (could be creation if new)
    await db.query(
      `INSERT INTO task_events (task_id, agent_id, event_type, payload)
       VALUES ($1, $2, $3, $4)`,
      [taskId, agentId, 'task_upserted', JSON.stringify(t)]
    );
    // Handle subtasks similarly
    if (Array.isArray(t.subtasks)) {
      for (const sub of t.subtasks) {
        const subAgentId = await getOrCreateAgent(sub.assigned_to || ownerName);
        const subId = await upsertTask(sub, subAgentId);
        await db.query(
          `INSERT INTO task_events (task_id, agent_id, event_type, payload)
           VALUES ($1, $2, $3, $4)`,
          [subId, subAgentId, 'task_upserted', JSON.stringify(sub)]
        );
      }
    }
  }

  console.log('Database update completed.');
  process.exit(0);
}

main().catch(err => {
  console.error('Error updating DB:', err);
  process.exit(1);
});
