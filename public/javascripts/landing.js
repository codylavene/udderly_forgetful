document.addEventListener("DOMContentLoaded", (e) => {
  const swiperImg = document.querySelector(".swiper-img");
  const swiperHead = document.querySelector(".swiper-head");
  const swiperText = document.querySelector(".swiper-text");

  let i = 0;
  const swiper = () => {
    swiperImg.classList.add(".active");
    swiperImg.classList.add(".prev");
    swiperImg.classList.add(".prev");
  };
  setTimeout(swiper, 600);
});
