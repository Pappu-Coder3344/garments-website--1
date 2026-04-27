/* ================================
   Texora Garments - script.js
   ================================ */

/* Header Scroll Effect */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


/* Mobile Menu */
const menuBtn = document.querySelector(".menu-btn");
const closeMenuBtn = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});


/* Active Navigation Link on Scroll */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function activeNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activeNavLink);


/* Custom Cursor */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (event) => {
  const posX = event.clientX;
  const posY = event.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    {
      duration: 450,
      fill: "forwards",
    }
  );
});

const hoverElements = document.querySelectorAll(
  "a, button, .product-card, .feature-box, .timeline-item"
);

hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorOutline.style.width = "58px";
    cursorOutline.style.height = "58px";
    cursorOutline.style.background = "rgba(0, 212, 255, 0.08)";
  });

  element.addEventListener("mouseleave", () => {
    cursorOutline.style.width = "36px";
    cursorOutline.style.height = "36px";
    cursorOutline.style.background = "transparent";
  });
});


/* Scroll Reveal Animation */
const revealElements = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-up"
);

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 90) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* Animated Progress Bars */
const progressBars = document.querySelectorAll(".progress-bar span");
const qualitySection = document.querySelector(".quality");

let progressStarted = false;

function animateProgressBars() {
  if (!qualitySection) return;

  const sectionTop = qualitySection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 120 && !progressStarted) {
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });

    progressStarted = true;
  }
}

window.addEventListener("scroll", animateProgressBars);


/* Hero Stats Counter Animation */
const statNumbers = document.querySelectorAll(".hero-stats h3");
let statsStarted = false;

function animateCounter(element, target, suffix) {
  let current = 0;
  const duration = 1700;
  const increment = target / (duration / 16);

  function updateCounter() {
    current += increment;

    if (current < target) {
      element.textContent = `${Math.floor(current)}${suffix}`;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  }

  updateCounter();
}

function startStatsCounter() {
  const heroStats = document.querySelector(".hero-stats");

  if (!heroStats) return;

  const statsTop = heroStats.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (statsTop < windowHeight - 80 && !statsStarted) {
    statNumbers.forEach((number) => {
      const text = number.textContent.trim();

      if (text.includes("+")) {
        const target = parseInt(text.replace("+", ""));
        animateCounter(number, target, "+");
      }

      if (text.includes("M+")) {
        const target = parseInt(text.replace("M+", ""));
        animateCounter(number, target, "M+");
      }
    });

    statsStarted = true;
  }
}

window.addEventListener("scroll", startStatsCounter);
window.addEventListener("load", startStatsCounter);


/* 3D Product Card Mouse Movement */
const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const cardRect = card.getBoundingClientRect();

    const x = event.clientX - cardRect.left;
    const y = event.clientY - cardRect.top;

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      translateY(-14px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});


/* Contact Form Demo Interaction */
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const submitBtn = contactForm.querySelector("button");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = `
    Message Sent
    <i class="fa-solid fa-check"></i>
  `;

  submitBtn.style.pointerEvents = "none";

  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.pointerEvents = "auto";
    contactForm.reset();
  }, 2200);
});


/* Smooth Scroll Offset for Header */
const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

allAnchorLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});


/* Simple Parallax Effect */
const heroVisual = document.querySelector(".hero-visual");
const shapeOne = document.querySelector(".shape-one");
const shapeTwo = document.querySelector(".shape-two");

window.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  if (heroVisual) {
    heroVisual.style.transform = `
      translateX(${(x - 0.5) * 18}px)
      translateY(${(y - 0.5) * 18}px)
    `;
  }

  if (shapeOne) {
    shapeOne.style.transform = `
      translate(${(x - 0.5) * 45}px, ${(y - 0.5) * 45}px)
    `;
  }

  if (shapeTwo) {
    shapeTwo.style.transform = `
      translate(${(x - 0.5) * -55}px, ${(y - 0.5) * -55}px)
    `;
  }
});


/* Page Load Animation */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
