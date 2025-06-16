// ===============================================
// BAGIAN 1: FUNGSI HAMBURGER MENU
// ===============================================
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};
const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// ===============================================
// BAGIAN 2: INISIALISASI IKON
// ===============================================
feather.replace();

// ===============================================
// BAGIAN 3: FUNGSI ANIMASI TIRAI PEMBUKA
// ===============================================
function openCurtains() {
  const leftCurtain = document.querySelector(".curtain.left");
  const rightCurtain = document.querySelector(".curtain.right");
  if (!leftCurtain || !rightCurtain) return;
  leftCurtain.style.animation = "open-left 2.5s ease-in-out forwards";
  rightCurtain.style.animation = "open-right 2.5s ease-in-out forwards";
  setTimeout(() => {
    const homeContent = document.querySelector("#home .content");
    if (homeContent) homeContent.style.opacity = 1;
  }, 1500);
}

// [DITAMBAHKAN] Fungsi untuk membuat efek salju
function createSnow() {
  const snowContainer = document.getElementById("snow-container");
  if (!snowContainer) return;
  const snowCount = 150; // Jumlah partikel salju

  for (let i = 0; i < snowCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    const size = Math.random() * 4 + 1; // Ukuran 1px - 5px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 8 + 7}s`; // Durasi 7-15 detik
    snowflake.style.animationDelay = `${Math.random() * 10}s`;
    snowflake.style.opacity = Math.random() * 0.7 + 0.3; // Opasitas 0.3 - 1.0

    snowContainer.appendChild(snowflake);
  }
}

// ==========================================================
// BAGIAN 4: ANIMASI SCROLL UNTUK SEMUA BLOK KONTEN
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // ==========================================================
  // BAGIAN 5: LOGIKA KARTU ALGORITMA (FLIP MANUAL)
  // ==========================================================
  const cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });

  // ==========================================================
  // BAGIAN 6: FUNGSI MEMBUAT KUNANG-KUNANG
  // ==========================================================
  function createFireflies() {
    const fireflyContainer = document.querySelector(".fireflies");
    if (!fireflyContainer) return;
    const fireflyCount = 20;
    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement("div");
      firefly.className = "firefly";
      firefly.style.top = `${Math.random() * 100}%`;
      firefly.style.left = `${Math.random() * 100}%`;
      firefly.style.animationDuration = `${Math.random() * 10 + 10}s`;
      firefly.style.animationDelay = `${Math.random() * 10}s`;
      firefly.style.setProperty("--x1", `${Math.random() * 200 - 100}px`);
      firefly.style.setProperty("--y1", `${Math.random() * 200 - 100}px`);
      firefly.style.setProperty("--x2", `${Math.random() * 200 - 100}px`);
      firefly.style.setProperty("--y2", `${Math.random() * 200 - 100}px`);
      firefly.style.setProperty("--x3", `${Math.random() * 200 - 100}px`);
      firefly.style.setProperty("--y3", `${Math.random() * 200 - 100}px`);
      fireflyContainer.appendChild(firefly);
    }
  }
  createFireflies();

  // [DITAMBAHKAN] Panggil fungsi untuk membuat salju
  createSnow();

  // ==========================================================
  // BAGIAN 7: FUNGSI NAVIGASI DROPDOWN KE KARTU
  // ==========================================================
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.dataset.target;
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        document.querySelectorAll(".card-container").forEach((card) => {
          card.classList.remove("is-flipped");
        });
        targetCard.classList.add("is-flipped");
      }
    });
  });

  // ==========================================================
  // BAGIAN 8: FUNGSI NAVIGASI HOME & TIRAI OTOMATIS
  // ==========================================================
  const homeLink = document.querySelector('.navbar-nav a[href="#home"]');
  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      openCurtains();
      navbarNav.classList.remove("active");
    });
  }

  // ==========================================================
  // BAGIAN 9: [DIPERBARUI] FUNGSI PENCARIAN
  // ==========================================================
  const searchFormContainer = document.querySelector(".search-form-container");
  const searchButton = document.querySelector("#search-button");
  const searchForm = document.querySelector("#search-form");
  const searchBox = document.querySelector("#search-box");
  const searchCounter = document.querySelector("#search-counter");

  let searchMatches = [];
  let currentMatchIndex = -1;

  searchButton.onclick = (e) => {
    e.preventDefault();
    searchFormContainer.classList.toggle("active");
    searchBox.focus();
  };

  // [DIPERBARUI] Tutup form DAN HAPUS HIGHLIGHTS jika klik di luar
  document.addEventListener("click", function (e) {
    if (
      !searchButton.contains(e.target) &&
      !searchFormContainer.contains(e.target)
    ) {
      if (searchFormContainer.classList.contains("active")) {
        searchFormContainer.classList.remove("active");
        removeHighlights(); // Panggil fungsi untuk menghapus sorotan
      }
    }
  });

  function removeHighlights() {
    const highlights = document.querySelectorAll(
      ".search-highlight, .search-highlight-active"
    );
    highlights.forEach((span) => {
      if (span.parentNode) {
        span.outerHTML = span.innerHTML;
      }
    });
    searchMatches = [];
    currentMatchIndex = -1;
    updateSearchCounter();
  }

  function updateSearchCounter() {
    if (searchMatches.length > 0) {
      searchCounter.textContent = `${currentMatchIndex + 1} dari ${
        searchMatches.length
      }`;
    } else {
      searchCounter.textContent = "";
    }
  }

  function navigateToMatch(direction) {
    if (searchMatches.length === 0) return;
    searchMatches[currentMatchIndex].classList.remove(
      "search-highlight-active"
    );
    currentMatchIndex += direction;
    if (currentMatchIndex >= searchMatches.length) {
      currentMatchIndex = 0;
    } else if (currentMatchIndex < 0) {
      currentMatchIndex = searchMatches.length - 1;
    }
    const newMatch = searchMatches[currentMatchIndex];
    newMatch.classList.add("search-highlight-active");
    newMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    updateSearchCounter();
  }

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchBox.value.trim();
    removeHighlights();
    if (searchTerm === "") return;

    const contentElements = document.querySelectorAll("p, h1, h2, h3, h4, h5");
    const regex = new RegExp(
      searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "gi"
    );

    contentElements.forEach((element) => {
      element.childNodes.forEach((child) => {
        if (child.nodeType === 3) {
          const text = child.textContent;
          if (regex.test(text)) {
            const newHTML = text.replace(
              regex,
              `<span class="search-highlight">$&</span>`
            );
            const newFragment = document
              .createRange()
              .createContextualFragment(newHTML);
            child.parentNode.replaceChild(newFragment, child);
          }
        }
      });
    });

    searchMatches = document.querySelectorAll(".search-highlight");
    if (searchMatches.length > 0) {
      currentMatchIndex = 0;
      const firstMatch = searchMatches[currentMatchIndex];
      firstMatch.classList.add("search-highlight-active");
      firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert("Kata kunci tidak ditemukan.");
    }
    updateSearchCounter();
  });

  document.addEventListener("keydown", function (e) {
    if (searchMatches.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateToMatch(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateToMatch(-1);
    }
  });
});
