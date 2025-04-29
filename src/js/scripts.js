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

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    // Show after scrolling down 300px
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Scroll to top when clicked
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
