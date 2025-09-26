📝 Kanban Task Manager

A responsive, mobile-friendly Kanban board built with HTML, CSS, and JavaScript.
It supports task creation, editing, and deletion, with full localStorage persistence, a toggleable sidebar, dark/light mode, and an optional priority system (High / Medium / Low).

🚀 View Presentaion here
https://drive.google.com/file/d/1CRxb0D0EomHYDJlPWTjaLTaXPPhaUWdd/view?usp=sharing 

👉 View on Netlify
 (https://68d6931d5be0983d792ea82a--animated-profiterole-e41357.netlify.app/)

---------------------------------------------------------------

✨ Features

🌞Data Persistence

Tasks saved to localStorage.

On reload, tasks reappear in the correct columns.

🌞Task Management

Add tasks with title, description, status, and priority.

Edit tasks via a modal (update fields & priority).

Delete tasks with a confirmation step.

🌞Priority System (Stretch Goal)

High 🔴 / Medium 🟠 / Low 🟢 priority levels.

Shown on each task card as a colored dot.

Tasks auto-sorted in each column by priority.

🌞Sidebar Interaction

Toggleable sidebar with hide/show button.

👀 Open button appears when sidebar is hidden.

On mobile: slide-in menu accessed from the app logo.

🌞Theme Toggle

Dark 🌙 / Light ☀️ modes with smooth CSS variable theming.

Toggle works in both desktop sidebar and mobile menu.

Theme choice saved in localStorage and persists on reload.

🌞Responsive Design

Desktop and mobile layouts.

Sidebar transforms into a mobile menu.

Task board stays accessible across all screen sizes.
---------------------------------------------------------------

🛠️ Tech Stack
HTML5 – semantic structure

CSS3 – responsive design, dark/light themes, sidebar & menu animations

JavaScript (ES6) – DOM manipulation, localStorage, modular code structure

---------------------------------------------------------------

⚙️ How It Works

🌸On Load

Reads tasks from localStorage.

If empty, can seed from initialData.js.

Renders tasks into columns (To Do, Doing, Done).

🌸Adding Tasks

Opens a modal with input fields.

Saves new task to storage and re-renders board.

🌸Editing Tasks

Click a task → modal opens prefilled.

Update fields → save → persists changes + refreshes UI.

🌸Deleting Tasks

Modal has Delete button with confirmation.

Task removed from storage + UI re-rendered.

🌸Priority Sorting

Each column sorts tasks by priority weight: High (0) → Medium (1) → Low (2).

Sorting reapplied on every render and reload.

🌸Sidebar & Theme

Sidebar hides/shows with toggle.

On mobile, transforms into slide-in menu (with overlay).

Theme toggle uses localStorage + data-theme attribute.

---------------------------------------------------------------

👩🏽‍💻 Author

Tsepang Teele – Software Developer in training

💼 LinkedIn: www.linkedin.com/in/tsepang-teele-66b17826a

🐙 GitHub :Tsepangteele
