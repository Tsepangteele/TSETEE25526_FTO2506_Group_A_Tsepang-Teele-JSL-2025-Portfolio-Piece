// tasks/taskManager.js
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");
  const priorityRaw = document.getElementById("new-task-priority").value;

  if (!title) return;

  const tasks = loadTasksFromStorage();

  // include priority and normalize to lowercase
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1 : 1,
    title,
    description,
    status,
    priority: String(priorityRaw || "low").toLowerCase(),  // ← this drives the dot color
    board: "Launch Career",                                 // keep consistent with initial data
  };

  const updatedTasks = [...tasks, newTask];

  
  saveTasksToStorage(updatedTasks);

  clearExistingTasks();
  renderTasks(updatedTasks);
  resetForm();

  // be defensive: close whatever modal/overlay you’re using
  if (overlay?.close) {
    overlay.close();
  } else if (overlay) {
    overlay.style.visibility = "hidden";
  }
}
