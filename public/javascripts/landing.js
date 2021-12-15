document.addEventListener("DOMContentLoaded", (e) => {
  const swiperImg = document.querySelector(".swiper-img");
  const swiperHead = document.querySelector(".swiper-head");
  const swiperText = document.querySelector(".swiper-text");
  const imgs = [
    "../assets/images/hp_steve_1.png",
    "../assets/images/hp_steve_2.png",
    "../assets/images/hp_steve_3.png",
    "../assets/images/hp_steve_4.png",
  ];
  let i = 0;
  const slide = () => {
    swiperImg.style.backgroundImg = imgs[i];
    i++;
  };
  setInterval(slide, 600);
});
