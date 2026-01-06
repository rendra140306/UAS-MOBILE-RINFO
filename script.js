document.addEventListener("DOMContentLoaded", () => {
  setYearInFooters();
  highlightActiveNav();
  fadeInOnScroll();
  setupLoadMoreServices();

  // Scroll listener untuk fade-in
  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(fadeInOnScroll);
  }, {passive: true});

  // ===============================
  // GREETING BERGANTIAN DENGAN FADE SMOOTH + TEBAL
  // ===============================
  const greetingSpan = document.getElementById("hero-greeting");
  if (greetingSpan) {
    // Buat teks hero lebih tebal dan besar
    greetingSpan.style.fontWeight = "700";  // bold
    greetingSpan.style.fontSize = "2.5rem"; // bisa diubah sesuai selera

    function getTimeGreeting() {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 10) return "Selamat Pagi";
      if (hour >= 10 && hour < 15) return "Selamat Siang";
      if (hour >= 15 && hour < 18) return "Selamat Sore";
      return "Selamat Malam";
    }

    // Teks awal langsung diset ke "Selamat Datang di RINFO"
    const greetings = ["Selamat Datang di RINFO", getTimeGreeting()];
    greetingSpan.textContent = greetings[0];
    let index = 0;

    setInterval(() => {
      // fade-out
      let opacity = 1;
      const fadeOut = setInterval(() => {
        opacity -= 0.05;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fadeOut);

          // ganti teks berikutnya
          index = (index + 1) % greetings.length;
          greetingSpan.textContent = greetings[index];

          // fade-in
          let opacityIn = 0;
          const fadeIn = setInterval(() => {
            opacityIn += 0.05;
            if (opacityIn >= 1) {
              opacityIn = 1;
              clearInterval(fadeIn);
            }
            greetingSpan.style.opacity = opacityIn;
          }, 20);
        }
        greetingSpan.style.opacity = opacity;
      }, 20);
    }, 2000);
  }
});

/* ===============================
   FADE-IN ON SCROLL
================================ */
function fadeInOnScroll() {
  const elements = document.querySelectorAll(".scroll-animate");
  const triggerPoint = window.innerHeight * 0.85;

  elements.forEach(el => {
    if (el.getBoundingClientRect().top < triggerPoint) {
      el.classList.add("visible");
    }
  });
}

/* ===============================
   FOOTER TAHUN OTOMATIS
================================ */
function setYearInFooters() {
  const year = new Date().getFullYear();
  const yearElements = document.querySelectorAll(
    "#year, #year-gallery, #year-services, #year-contact"
  );
  yearElements.forEach(el => el.textContent = year);
}

/* ===============================
   NAVBAR LINK AKTIF
================================ */
function highlightActiveNav() {
  const links = document.querySelectorAll(".navbar .nav-link");
  const currentPage = location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });
}

/* ===============================
   LOAD MORE SERVICES
================================ */
function setupLoadMoreServices() {
  const btn = document.querySelector("#loadMoreServices");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".service-card.d-none");
    hiddenCards.forEach(card => card.classList.remove("d-none"));
    btn.style.display = "none";
  });
}
