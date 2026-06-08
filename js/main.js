// Sigma Design — interactions

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
}

// Tabs
document.querySelectorAll(".tabs").forEach((tabs) => {
  const buttons = tabs.querySelectorAll(".tab-btn");
  const container = tabs.parentElement;
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      buttons.forEach((b) => b.classList.toggle("active", b === btn));
      container
        .querySelectorAll(".tab-panel")
        .forEach((p) => p.classList.toggle("active", p.dataset.tab === target));
      // update hash without jumping
      history.replaceState(null, "", `#${target}`);
    });
  });
  // open from hash
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const btn = tabs.querySelector(`[data-tab="${hash}"]`);
    if (btn) btn.click();
  }
});

// Lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `<button class="lightbox-close" aria-label="Close">×</button><img alt="" />`;
document.body.appendChild(lightbox);
const lbImg = lightbox.querySelector("img");
const lbClose = lightbox.querySelector(".lightbox-close");

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}
document
  .querySelectorAll(".design-figure img, .cost-card-img img")
  .forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lbClose) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Year
const yEl = document.querySelector("[data-year]");
if (yEl) yEl.textContent = new Date().getFullYear();
