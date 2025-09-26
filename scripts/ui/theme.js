const KEY = "theme";

function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  const box = document.getElementById("themeSwitch");
  if (box) box.checked = (theme === "dark");
}

export default function setupThemeToggle(){
  // initial theme: saved or OS preference
  let theme =
    localStorage.getItem(KEY) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(theme);

  // toggle + persist
  const box = document.getElementById("themeSwitch");
  box?.addEventListener("change", () => {
    theme = box.checked ? "dark" : "light";
    localStorage.setItem(KEY, theme);
    applyTheme(theme);
  });
}
