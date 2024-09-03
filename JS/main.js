//food catedories
document
  .querySelector(".categories__sections")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let category = e.target.closest(".category");
    let activeCateg = document.querySelector(".category.active");
    activeCateg.classList.remove("active");
    category.classList.add("active");
    let activeCards = document.querySelector(".categories__cards.active");
    let curCards = document.querySelector(`#${category.dataset.cards}`);
    activeCards.classList.remove("active");
    curCards.classList.add("active");
  });

//scroll to sections
const nav = document.querySelector(".nav");
nav.addEventListener("click", (event) => {
  event.preventDefault();
  let link = event.target;
  if (!link.classList.contains("nav-link")) return;

  let elem = document.querySelector(`#${link.dataset.goto}`);
  let coordY = elem.getBoundingClientRect().top + scrollY - 100;
  window.scrollTo({
    top: coordY,
    left: 0,
    behavior: "smooth",
  });

  let activeLink = document.querySelector(".nav-link.active");
  activeLink.classList.remove("active");
  link.classList.add("active");
  nav.classList.remove("active");
  burgerMenu.classList.remove("active");
});

let sectionsArr = [];
document.querySelectorAll(".nav-link").forEach((link) => {
  if (`${link.dataset.goto}` !== "undefined")
    sectionsArr.push(`${link.dataset.goto}`);
});
//active link by scroll
window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;
  sectionsArr.forEach((section) => {
    let curSect = document.querySelector(`#${section}`);
    if (curSect.offsetTop - 130 <= scrollDistance) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        if (link.classList.contains("active")) link.classList.remove("active");
      });
      document
        .querySelector(`[data-goto="${section}"]`)
        .classList.add("active");
    }
  });
});

//fixed header
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (scrollY > 150) {
    header.classList.add("fixed");
  } else header.classList.remove("fixed");
});

//burger-menu
const burgerMenu = document.querySelector(".burger_menu");
burgerMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
  burgerMenu.classList.toggle("active");
});

const searchContainer = document.querySelector(".search_container");
const searchIcon = document.querySelector(".nav-link.icon:first-child");
searchIcon.addEventListener("click", () => {
  if (!searchContainer.classList.contains("active")) {
    searchContainer.classList.add("active");
    nav.style.marginLeft = "100px";
  } else {
    searchContainer.classList.remove("active");
    nav.style.marginLeft = "280px";
  }
});

//reviews slider
const slider = document.querySelector(".reviews__slider");
const sliderContainer = document.querySelector(".reviews_container");
const prevBtn = document.querySelector(".arrow_left");
const nextBtn = document.querySelector(".arrow_right");
const reviews = document.querySelectorAll(".review");

let curSlide = 0;
let timeout;
updateReview();

function updateReview() {
  if (curSlide > reviews.length - 1) curSlide = 0;
  else if (curSlide < 0) curSlide = reviews.length - 1;

  sliderContainer.style.transform = `translateX(-${
    curSlide * slider.offsetWidth
  }px)`;

  timeout = setTimeout(() => {
    updateReview();
  }, 4000);
}

prevBtn.addEventListener("click", () => {
  curSlide--;
  clearTimeout(timeout);
  updateReview();
});
nextBtn.addEventListener("click", () => {
  curSlide++;
  clearTimeout(timeout);
  updateReview();
});
