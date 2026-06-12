const cursor = document.querySelector(".cursor");
const cursorLabel = document.querySelector(".cursor-label");
const interactiveItems = document.querySelectorAll("[data-cursor]");
const revealTargets = document.querySelectorAll(".reveal-item, .reveal-section");
const ambientItems = document.querySelectorAll(".ambient");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseCursor && cursor) {
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!prefersReducedMotion) {
      ambientItems.forEach((item, index) => {
        const strength = index === 0 ? 22 : -16;
        const moveX = (mouseX / window.innerWidth - 0.5) * strength;
        const moveY = (mouseY / window.innerHeight - 0.5) * strength;
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    }
  });

  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };

  renderCursor();

  interactiveItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("is-active");
      cursorLabel.textContent = item.dataset.cursor || "";
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-active");
      cursorLabel.textContent = "";
    });
  });
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
});
