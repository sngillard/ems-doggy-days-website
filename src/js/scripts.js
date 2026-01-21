// Fade in each section when it scrolls into view
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target); // Fade in once
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => observer.observe(section));

// Scroll-to-top button (guarded)
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- Toast helpers ----
const toast = document.getElementById("toast");
const toastText = document.getElementById("toast-text");
const toastClose = document.querySelector(".toast-close");

let toastTimer;

function showToast(text, autoHideMs = 4500) {
  if (!toast || !toastText) return;

  toastText.textContent = text;
  toast.classList.add("is-visible");
  toast.setAttribute("aria-hidden", "false");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, autoHideMs);
}

function hideToast() {
  if (!toast) return;
  toast.classList.remove("is-visible");
  toast.setAttribute("aria-hidden", "true");
}

if (toastClose) {
  toastClose.addEventListener("click", hideToast);
}

// ---- Netlify form submit (AJAX) ----
const form = document.querySelector('form[name="contact"]');

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    showToast("Submitting…", 1500);

    try {
      const formData = new FormData(form);
      formData.append("form-name", "contact");

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        showToast("Thank you! We’ll be in touch soon.");
        form.reset();
      } else {
        showToast(
          "Sorry — something went wrong. Please call or email us instead.",
          6500
        );
        console.error(
          "Form POST failed:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      showToast(
        "Sorry — something went wrong. Please try again or contact us directly.",
        6500
      );
      console.error("Form submit error:", err);
    }
  });
}
