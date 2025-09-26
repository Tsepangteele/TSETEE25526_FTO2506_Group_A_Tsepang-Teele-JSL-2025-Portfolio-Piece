/* created a function names toggle sidebar and exports the function 
be used in main.js */


export default function toggleSidebar() {
  const sidebar = document.querySelector(".side-bar");
  if (!sidebar) return false;

  const hidden = sidebar.classList.toggle("hidden");
  document.body.classList.toggle("sidebar-hidden", hidden); // drives the 👀 button visibility
  return hidden;
}
