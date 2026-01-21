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
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Show or hide the scroll button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
  window.addEventListener("scroll", function () {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const form = document.querySelector('form[name="contact"]');
const message = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (message) {
      message.textContent = "Submitting…";
      message.style.display = "block";
    }

    // If the message element isn't on the page, don't crash.
    if (message) {
      message.style.display = "none";
      message.textContent = "";
    }

    try {
      const formData = new FormData(form);
      formData.append("form-name", "contact");

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        if (message) {
          message.textContent = "Thank you! We’ll be in touch soon.";
          message.style.display = "block";
        }
        form.reset();
      } else {
        if (message) {
          message.textContent =
            "Sorry — something went wrong. Please call or email us instead.";
          message.style.display = "block";
        }
        console.error(
          "Form POST failed:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      if (message) {
        message.textContent =
          "Sorry — something went wrong. Please try again or contact us directly.";
        message.style.display = "block";
      }
      console.error("Form submit error:", err);
    }
  });
}
