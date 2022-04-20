let sliderWrapper = document.querySelector(".slider-wrap");
let slider = document.querySelector(".slider");
let nextButton = document.querySelector(".btn-next");
let prevButton = document.querySelector(".btn-prev");
let clonesWidth;
let sliderWidth;
let scrollPosition;
let clones = [];
let disableScroll = false;

let items = [...document.querySelectorAll(".slider-item")];
let images = [...document.querySelectorAll(".slider-img")];

images.forEach((image, idx) => {
  image.style.backgroundImage = `url(./assets/${idx + 1}.jpg)`;
});

//clone images
items.forEach((item) => {
  let clone = item.cloneNode(true);
  clone.classList.add("clone");
  slider.appendChild(clone);
  clones.push(clone);
});

//get clone width
const getClonesWidth = () => {
  let clonesWidth = 0;
  clones.forEach((clone) => {
    clonesWidth += clone.offsetWidth;
  });
  return clonesWidth;
};

//get scroll position
const getScrollPosition = () => {
  return window.scrollY;
};

//set scroll position
const setScrollPosition = (position) => {
  window.scrollTo({ top: position });
};

//scroll update function
const scrollUpdate = () => {
//   sliderWrapper.style.overflow = "hidden";
  scrollPosition = getScrollPosition();
  if (clonesWidth + scrollPosition >= sliderWidth) {
    setScrollPosition(1);
  } else if (scrollPosition <= 0) {
    setScrollPosition(sliderWidth - clonesWidth - 1);
  }
  slider.style.transform = `translateX(-${scrollPosition}px)`;

  requestAnimationFrame(scrollUpdate);
  //   if (window.innerWidth > 768) {
  //   } else {
  //     // sliderWrapper.style.overflow = "scroll";
  //   }
};

//calculate dimensions
const calculateDimensions = () => {
  sliderWidth = slider.getBoundingClientRect().width;
  clonesWidth = getClonesWidth();
};

//on load function
const onLoad = () => {
  calculateDimensions();
  document.body.style.height = `${sliderWidth}px`;
  getScrollPosition();
  scrollUpdate();
};

onLoad();

document.addEventListener("resize", onLoad);

//autoscroll
const autoScroll = () => {
  //   if (disableScroll) return;
  scrollPosition += 3;
  setScrollPosition(scrollPosition);
  requestAnimationFrame(autoScroll);
};

// document.addEventListener('DOMContentLoaded', autoScroll);

//scroll with buttons
nextButton.addEventListener("click", () => {
  scrollPosition += 500;
  setScrollPosition(scrollPosition);
  slider.style.transform = `translateX(-${scrollPosition}px)`;

  getScrollPosition();
  scrollUpdate();
});

prevButton.addEventListener("click", () => {
  scrollPosition -= 500;
  setScrollPosition(scrollPosition);
  slider.style.transform = `translateX(-${scrollPosition}px)`;

  getScrollPosition();
  scrollUpdate();
});
