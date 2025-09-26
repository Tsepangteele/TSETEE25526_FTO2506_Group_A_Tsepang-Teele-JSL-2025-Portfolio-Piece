// scripts/main.js
import toggleSidebar from "./ui/sidebar.js";
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import { setupModalCloseHandler, setupNewTaskModalHandler } from "./ui/modalHandlers.js";
import setupThemeToggle from "./ui/theme.js";
import { initialTasks } from "../initialData.js";


document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
});


function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupNewTaskModalHandler();
}

document.addEventListener("DOMContentLoaded", () => {
  const hideBtn = document.querySelector(".sidebar-btn");   // Hide Sidebar
  const openBtn = document.querySelector(".open-sidebar");  // 👀 Show Sidebar
  const sidebar = document.querySelector(".side-bar");

  hideBtn?.addEventListener("click", toggleSidebar);
  openBtn?.addEventListener("click", toggleSidebar);

  // keep CSS state in sync so the 👀 appears only when needed
  const startsHidden = sidebar?.classList.contains("hidden");
  document.body.classList.toggle("sidebar-hidden", !!startsHidden);

  // render your board
  initTaskBoard();
});

/*==================================
Mobile view toggle and side bar
===================================*/
document.addEventListener('DOMContentLoaded', () => {
  const mql = window.matchMedia('(max-width: 768px)');

  // ----- build mobile menu + overlay (no HTML edits) -----
  const header = document.getElementById('header') || document.querySelector('header');
  if (!header) return;

  let overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    header.parentNode.insertBefore(overlay, header.nextSibling);
  }

  let menu = document.getElementById('menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'menu';
    menu.className = 'menu';
    menu.innerHTML = `
      <h3 class="menu-title">ALL BOARDS (1)</h3>
      <div id="menuBoardSlot"></div>
      <div id="menuThemeSlot"></div>
    `;
    header.parentNode.insertBefore(menu, overlay.nextSibling);
  }

  const menuBoardSlot = document.getElementById('menuBoardSlot');
  const menuThemeSlot = document.getElementById('menuThemeSlot');

  // ----- elements we’ll reparent (use your existing ones) -----
  const boardBtn    = document.querySelector('.board-btn');     // “Launch Career” button in sidebar
  const themeToggle = document.querySelector('.theme-change');  // your sidebar toggle block
  if (!boardBtn || !themeToggle || !menuBoardSlot || !menuThemeSlot) return;

  // return markers so we can put them back in the same place on desktop
  const boardReturn = document.createElement('div'); boardBtn.after(boardReturn);
  const toggleReturn = document.createElement('div'); themeToggle.after(toggleReturn);

  function place() {
    if (mql.matches) {
      // mobile → move into menu
      if (boardBtn.parentNode !== menuBoardSlot) menuBoardSlot.appendChild(boardBtn);
      if (themeToggle.parentNode !== menuThemeSlot) menuThemeSlot.appendChild(themeToggle);
    } else {
      // desktop → move back
      if (boardBtn.parentNode !== boardReturn.parentNode) boardReturn.before(boardBtn);
      if (themeToggle.parentNode !== toggleReturn.parentNode) toggleReturn.before(themeToggle);
      // ensure menu is closed when returning to desktop
      menu.classList.remove('is-open'); overlay.classList.remove('is-open');
    }
  }

  place();
  mql.addEventListener('change', place);

  // ----- open/close: use your purple logo as the trigger on mobile -----
  const trigger = document.querySelector('.logo-mobile'); // left icon in header
  function openMenu(){ menu.classList.add('is-open'); overlay.classList.add('is-open'); }
  function closeMenu(){ menu.classList.remove('is-open'); overlay.classList.remove('is-open'); }

  trigger && trigger.addEventListener('click', () => { if (mql.matches) openMenu(); });
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
});


/*==================================
      Save and Delete Button
======================================*/

/* ========= TASK MODAL: open, save, delete ========= */
(() => {
  const modal       = document.getElementById('task-modal');
  const titleInput  = document.getElementById('task-title');
  const descInput   = document.getElementById('task-desc');
  const statusInput = document.getElementById('task-status');
  const saveBtn     = document.querySelector('.save-btn');
  const deleteBtn   = document.querySelector('.delete-btn');

  /* stretch goals */
  const editPriorityInput = document.getElementById("task-priority");
  const newPriorityInput  = document.getElementById("new-task-priority");


  if (!modal || !saveBtn || !deleteBtn) return;

  let currentTaskId = null;

  function openTaskModal(task) {
    currentTaskId = String(task.id);
    titleInput.value  = task.title || '';
    descInput.value   = task.description || '';
    statusInput.value = task.status || 'todo';

    /* property select reflects tasks current priority*/
    editPriorityInput.value = (task.priority || 'low').toLowerCase();

    modal.showModal ? modal.showModal() : modal.setAttribute('open','');
  }

  // open modal when any .task-card clicked
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.task-card');
    if (!card) return;
    const id = card.dataset.taskId;
    const tasks = loadTasksFromStorage();
    const task  = tasks.find(t => String(t.id) === id);
    if (task) openTaskModal(task);
  });

  function refresh(tasks){
    clearExistingTasks();
    renderTasks(tasks);
  }

  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentTaskId) return;
    const tasks = loadTasksFromStorage();
    const i = tasks.findIndex(t => String(t.id) === currentTaskId);
    if (i === -1) return;
    tasks[i] = {
      ...tasks[i],
      title: titleInput.value.trim(),
      description: (descInput.value || '').trim(),
      status: statusInput.value,

      priority: (editPriorityInput.value || 'low').toLowerCase(),
      
    };
    saveTasksToStorage(tasks);
    refresh(tasks);
    modal.close?.();
    currentTaskId = null;
  });

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentTaskId) return;
    const tasks = loadTasksFromStorage();
    const next = tasks.filter(t => String(t.id) !== currentTaskId);
    saveTasksToStorage(next);
    refresh(next);
    modal.close?.();
    currentTaskId = null;
  });
})();
