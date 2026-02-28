const fs = require('fs');
const path = require('path');
const db = require('../db/db');

// Helper to ensure an agent exists and return its id
async function getOrCreateAgent(name) {
  const res = await db.query('SELECT id FROM agents WHERE name = $1', [name]);
  if (res.rowCount > 0) return res.rows[0].id;
  const insert = await db.query('INSERT INTO agents (name, status) VALUES ($1, $2) RETURNING id', [name, 'active']);
  return insert.rows[0].id;
}

async function main() {
  const tasksPath = path.join(__dirname, '..', 'memory', 'tasks.json');
  const raw = fs.readFileSync(tasksPath, 'utf8');
  const data = JSON.parse(raw);

  // Simple mapping: each top-level task becomes a row in tasks table
  for (const t of data.tasks) {
    // Determine agent owner from assigned_to (e.g., "IGOR/AI")
    const ownerName = t.assigned_to || 'unknown';
    const agentId = await getOrCreateAgent(ownerName);

    // Insert task
    const insertTask = await db.query(
      `INSERT INTO tasks (title, description, status, priority, agent_owner)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [t.title, t.notes || null, t.status, t.priority || null, agentId]
    );
    const taskId = insertTask.rows[0].id;

    // Log creation event
    await db.query(
      `INSERT INTO task_events (task_id, agent_id, event_type, payload)
       VALUES ($1, $2, $3, $4)`,
      [taskId, agentId, 'task_created', JSON.stringify(t)]
    );

    // If there are subtasks, insert them as separate tasks linked to same agent
    if (Array.isArray(t.subtasks)) {
      for (const sub of t.subtasks) {
        const subInsert = await db.query(
          `INSERT INTO tasks (title, description, status, priority, agent_owner)
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [sub.title, null, sub.status, null, agentId]
        );
        const subId = subInsert.rows[0].id;
        await db.query(
          `INSERT INTO task_events (task_id, agent_id, event_type, payload)
           VALUES ($1, $2, $3, $4)`,
          [subId, agentId, 'task_created', JSON.stringify(sub)]
        );
      }
    }
  }

  console.log('Database populated with current tasks.');
  process.exit(0);
}

main().catch(err => {
  console.error('Error populating DB:', err);
  process.exit(1);
});
