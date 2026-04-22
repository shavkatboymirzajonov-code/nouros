const faqItems = document.querySelectorAll(".faq-block__item");
const heroPreview = document.querySelector(".hero__preview");
const heroVideoCard = document.querySelector(".hero__video-card");
const heroVideo = document.querySelector(".hero__video");
const heroVideoClose = document.querySelector(".hero__video-close");
const heroModalOpen = document.querySelector(".hero__modal-open");
const heroModal = document.querySelector(".hero__modal");
const heroModalClose = document.querySelector(".hero__modal-close");
const heroModalVideo = document.querySelector(".hero__modal-video");
const themeButton = document.querySelector(".navbar__theme");

const updateThemeButton = () => {
  if (!themeButton) {
    return;
  }

  const isDark = document.body.classList.contains("dark-mode");
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
};

document.body.classList.toggle("dark-mode", localStorage.getItem("theme") === "dark");
updateThemeButton();

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    updateThemeButton();

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

const openHeroVideo = () => {
  if (!heroPreview || !heroVideo) {
    return;
  }

  heroPreview.classList.add("hero__preview--video");
  heroVideo.play().catch(() => {});
};

if (heroVideoCard) {
  heroVideoCard.addEventListener("click", openHeroVideo);

  heroVideoCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openHeroVideo();
    }
  });
}

if (heroVideoClose) {
  heroVideoClose.addEventListener("click", () => {
    heroPreview.classList.remove("hero__preview--video");
    heroVideo.pause();
    heroVideo.currentTime = 0;
  });
}

const closeHeroModal = () => {
  if (!heroModal || !heroModalVideo) {
    return;
  }

  heroModal.classList.remove("hero__modal--open");
  heroModalVideo.pause();
  heroModalVideo.currentTime = 0;
};

if (heroModalOpen && heroModal && heroModalVideo) {
  heroModalOpen.addEventListener("click", (event) => {
    event.preventDefault();
    heroModal.classList.add("hero__modal--open");
    heroModalVideo.play().catch(() => {});
  });
}

if (heroModalClose) {
  heroModalClose.addEventListener("click", closeHeroModal);
}

if (heroModal) {
  heroModal.addEventListener("click", (event) => {
    if (event.target === heroModal) {
      closeHeroModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeHeroModal();
  }
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-block__question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("faq-block__item--open");

    faqItems.forEach((currentItem) => {
      currentItem.classList.remove("faq-block__item--open");
    });

    if (!isOpen) {
      item.classList.add("faq-block__item--open");
    }
  });
});
