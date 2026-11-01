// Apply the theme before CSS paints. Storage can be unavailable in private contexts.
(() => {
  let saved;
  try {
    saved = localStorage.getItem("portfolio-theme");
  } catch {
    /* Use system preference. */
  }
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = ["light", "dark"].includes(saved)
    ? saved
    : systemDark
      ? "dark"
      : "light";
})();
