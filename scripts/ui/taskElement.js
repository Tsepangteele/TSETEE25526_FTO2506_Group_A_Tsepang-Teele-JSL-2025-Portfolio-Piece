import { openTaskModal } from "./modalHandlers.js";

export function createTaskElement(task) {
  const card = document.createElement('article');
  card.className = 'task-card task-div'; 
  card.dataset.taskId = String(task.id);

  // Title
  const titleEl = document.createElement("h4");
  titleEl.className = "task-title";
  titleEl.textContent = task.title ?? '';
  card.appendChild(titleEl);

  // PRIORITY BADGE
  const dot = document.createElement('span');
  const p = (task.priority || 'low').toLowerCase(); // default low if missing
  dot.className = `priority-dot ${p}`;              // → priority-dot high|medium|low
  dot.setAttribute('aria-label', `Priority: ${p}`);
  dot.title = `Priority: ${p}`;
  card.appendChild(dot);

  return card;
}