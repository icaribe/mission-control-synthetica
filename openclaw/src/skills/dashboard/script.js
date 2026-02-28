const statusToColumn = {
  'Backlog': 'todo',
  'Em Progresso': 'inprogress',
  'Concluído': 'done',
  'Aguardando': 'todo'
};

function renderTasks(tasks) {
  // Clear all column card containers
  document.querySelectorAll('.column').forEach(col => {
    col.querySelector('.cards').innerHTML = '';
  });

  tasks.forEach(task => {
    const columnKey = statusToColumn[task.status] || 'todo';
    const column = document.querySelector(`.column[data-status="${columnKey}"]`);
    if (!column) return;

    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.dataset.id = task.id;
    const assigned = task.assigned_to || 'Unassigned';
    card.innerHTML = `<div class="title">${task.title}</div><div class="assigned">Assigned to: ${assigned}</div>`;
    card.ondragstart = e => {
      e.dataTransfer.setData('text/plain', task.id);
    };
    column.querySelector('.cards').appendChild(card);
  });
}

// Fetch tasks from the /tasks endpoint
fetch('/tasks')
  .then(r => {
    if (!r.ok) throw new Error('Network response was not ok');
    return r.json();
  })
  .then(data => {
    const tasks = data.tasks || data; // support both formats
    renderTasks(tasks);
  })
  .catch(err => {
    console.error('Failed to load tasks:', err);
  });