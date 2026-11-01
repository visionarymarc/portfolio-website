// Theme choice is shared across pages; the toggle announces its next action.
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
function updateThemeLabel() {
  const next = root.dataset.theme === "dark" ? "Light" : "Dark";
  themeToggle.textContent = `${next} mode ◐`;
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${next.toLowerCase()} mode`,
  );
}
if (themeToggle) {
  themeToggle.hidden = false;
  updateThemeLabel();
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("portfolio-theme", root.dataset.theme);
    } catch {
      /* Still works for this page. */
    }
    updateThemeLabel();
  });
}
// Honor reduced motion for both decorative CSS and user-triggered scrolling.
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  const updateTopButton = () => {
    topBtn.hidden = window.scrollY < 400;
  };
  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();
  topBtn.addEventListener("click", () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    }),
  );
}
// A static site cannot send email: prepare a draft without claiming delivery.
const form = document.querySelector(".contact-form");
if (form) {
  const status = document.getElementById("form-status");
  form.querySelector("button").disabled = false;
  status.textContent =
    "Prepare your draft, then use the link to open it in your email app.";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const subject = `Portfolio inquiry from ${fields.get("name").trim()}`;
    const body = `Name: ${fields.get("name").trim()}\nReply email: ${fields.get("email").trim()}\n\n${fields.get("message").trim()}`;
    const draft = document.createElement("a");
    draft.href = `mailto:valbrunmarcus@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    draft.textContent = "Open draft in your email app ↗";
    draft.className = "text-link";
    status.textContent =
      "Draft prepared; no message has been sent by this website. ";
    status.append(draft);
  });
}
