const navBar = document.querySelector(".navbar");
const offcanvas = document.querySelector("#offcanvasNavbar");

window.addEventListener("scroll", () => {
  const isOffcanvasOpen = offcanvas.classList.contains("show");

  if (!isOffcanvasOpen && window.scrollY > 60) {
    navBar.classList.add("move");
  } else if (!isOffcanvasOpen) {
    navBar.classList.remove("move");
  }
});


// our services
var swiper = new Swiper(".our-services", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Select all image divs and pagination bullets
const images = document.querySelectorAll('[class^="image-"]');
const bullets = document.querySelectorAll('.swiper-pagination-bullet');

// Append each image div to its corresponding bullet
images.forEach((imgDiv, index) => {
  if (bullets[index]) {
    bullets[index].appendChild(imgDiv);
  }
});



// Left Swiper - single slide
const leftSwiper = new Swiper('.left-swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  mousewheel: false,      // disable mouse scroll
  simulateTouch: false,   // disable touch/swipe
  allowTouchMove: true,   // also disables drag
  loop: window.innerWidth < 1200, // Apply loop for screens < 1200px
  autoplay: window.innerWidth < 1200 ? {
    delay: 2500,
    disableOnInteraction: false,
  } : false, // Apply autoplay only for screens < 1200px
});


// Right Swiper - 3 slides visible
const rightSwiper = new Swiper('.right-swiper', {
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 10,
  mousewheel: true,
});

// Add click events to right slides to control left swiper
document.querySelectorAll('.right-swiper .swiper-slide').forEach((slide, index) => {
  slide.addEventListener('click', () => {
    leftSwiper.slideTo(index);
  });
});


// drop down
// Disable hover behavior on touch devices (mobile/tablets)
document.addEventListener('DOMContentLoaded', function () {
  if ('ontouchstart' in document.documentElement) {
    // Touch device – keep Bootstrap's default click behavior
    return;
  }

  // For desktop: handle hover show/hide manually if needed
  const dropdown = document.querySelector('.dropdown');
  const menu = dropdown.querySelector('.dropdown-menu');

  dropdown.addEventListener('mouseenter', () => {
    menu.classList.add('show');
  });

  dropdown.addEventListener('mouseleave', () => {
    menu.classList.remove('show');
  });
});

// service active
const slideActive = document.querySelectorAll(".swiper-slide.image");

slideActive.forEach((firstSlide) => {
  firstSlide.addEventListener("click", () => {
    // Remove 'arrow' from all slides
    slideActive.forEach((slide) => {
      slide.classList.remove("arrow");
    });

    // Add 'arrow' to the clicked one
    firstSlide.classList.add("arrow");
  });
});

// Back to Top functionality
const backToTopBtn = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


