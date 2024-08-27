const heroSection = document.getElementById("hero-section");
const bodyScroll = document.getElementById("body-scroll");
const loaderScene = document.getElementById("intro-scene");

loaderScene.style.display = "block";

const tlLoader = gsap.timeline({
  onComplete: () => {
    // heroSection.style.opacity = "100%";
    bodyScroll.style.overflow = "visible";
    bodyScroll.style.height = "auto";
    loaderScene.style.display = "none";
  },
});

tlLoader
  .to(loaderScene, {
    opacity: 0.5,
    delay: 8.5,
    ease: "ease-in",
    duration: 0.5,
  })
  .to(heroSection, {
    opacity: 1,
    duration: 0.5,
    ease: "ease-out",
  })
  .to(loaderScene, {
    opacity: 0,
    ease: "ease-in",
    duration: 0.5,
  });

const navContainer = document.querySelector("#navWrap");
const navShape = document.querySelector(".nav_shape");
const navLinks = document.querySelectorAll(".navbar_link");

let isHovering = false;

function setNavVariables(nav) {
  const navRect = nav.getBoundingClientRect();
  const containerRect = navContainer.getBoundingClientRect();

  const top = navRect.top - containerRect.top + "px";
  const left = navRect.left - containerRect.left + "px";
  const width = navRect.width + "px";
  const height = navRect.height + "px";

  navShape.style.setProperty("--card-bg-top", top);
  navShape.style.setProperty("--card-bg-left", left);
  navShape.style.setProperty("--card-bg-width", width);
  navShape.style.setProperty("--card-bg-height", height);
}

function updateSVGDimensions() {
  const button = document.querySelector(".contact_component.glow-effect");
  const svg = button.querySelector("svg");
  const rects = svg.querySelectorAll(".glow-rect");

  const buttonRect = button.getBoundingClientRect();

  svg.setAttribute("width", buttonRect.width);
  svg.setAttribute("height", buttonRect.height);

  // Update the rect dimensions within the SVG
  rects.forEach((rect) => {
    rect.setAttribute("width", buttonRect.width - 1.5);
    rect.setAttribute("height", buttonRect.height - 1.5);
  });

  // Update navigation variables as well to adapt to the new dimensions
  const currentLink = document.querySelector(".navbar_link.w--current");
  if (currentLink) {
    setNavVariables(currentLink);
  }
}

// Call the function on page load
window.addEventListener("load", updateSVGDimensions);

// Call the function on resize
window.addEventListener("resize", updateSVGDimensions);

// Use ResizeObserver to listen to changes in the size of the navContainer
const resizeObserver = new ResizeObserver(() => {
  updateSVGDimensions();
});

resizeObserver.observe(navContainer);

const svgObserver = new MutationObserver(updateSVGDimensions);
svgObserver.observe(document.querySelector(".contact_component.glow-effect"), {
  childList: true,
  subtree: true,
});

document.addEventListener("DOMContentLoaded", () => {
  const currentLink = document.querySelector(".navbar_link.w--current");
  if (currentLink) {
    setNavVariables(currentLink);
  }
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const targetElement = mutation.target;
      if (targetElement.classList.contains("w--current") && !isHovering) {
        setNavVariables(targetElement);
      }
    }
  });
});

const config = { attributes: true };

navLinks.forEach((navLink) => {
  observer.observe(navLink, config);
});

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = document.querySelector(this.getAttribute("href"));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

navLinks.forEach((nav) => {
  nav.addEventListener("mouseover", () => {
    isHovering = true;
    setNavVariables(nav);
  });

  nav.addEventListener("mouseout", () => {
    isHovering = false;
    const currentLink = document.querySelector(".navbar_link.w--current");
    if (currentLink) {
      setNavVariables(currentLink);
    }
  });
});

const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isHovering) {
        const targetLink = document.querySelector(
          `a[href="#${entry.target.id}"]`
        );
        if (targetLink) {
          setNavVariables(targetLink);
        }
      }
    });
  },
  {
    root: null,
    threshold: 0.5,
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const icon = document.querySelector(".icon-wrap");
  const path = document.querySelector("#path");

  const pathData = path.getAttribute("d");

  icon.style.offsetPath = `path('${pathData}')`;
  icon.style.offsetDistance = "0%";
});
const cta = document.querySelector(".button-wrap");

cta.addEventListener("click", function () {
  this.classList.remove("clicked");

  // console.log("clicked");

  void this.offsetWidth;

  // Add the class to trigger the animation
  this.classList.add("clicked");
});

document.querySelectorAll(".moon-checkbox input").forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    const moonFill = this.nextElementSibling.querySelector(".moon-fill");
    if (this.checked) {
      moonFill.setAttribute(
        "d",
        "M 25 5 A 20 20 0 1 0 25 45 A 20 20 0 1 0 25 5 Z"
      ); // Full moon
    } else {
      moonFill.setAttribute(
        "d",
        "M 25 5 A 20 20 0 1 0 25 45 A 15 20 0 1 1 25 5 Z"
      ); // Crescent moon
    }
  });
});
