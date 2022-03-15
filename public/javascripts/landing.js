document.addEventListener("DOMContentLoaded", (e) => {
	const swiperImg = document.querySelector(".swiper-img");
	const swiperHead = document.querySelector(".swiper-head");
	const swiperText = document.querySelector(".swiper-text");
	let index = 1;
	let timer = setInterval(() => {
		changeSlide(1);
	}, 5000);
	const changeSlide = (n) => {
		// plus slides
		clearInterval(timer);
		if (n < 0) {
			showSlide((index -= 1));
		} else {
			showSlide((index += 1));
		}
		if (n === -1) {
			timer = setInterval(() => {
				changeSlide(n + 2);
			}, 5000);
		} else {
			timer = setInterval(() => {
				changeSlide(n + 1);
			}, 5000);
		}
	};

	const activeSlide = (n) => {
		clearInterval(timer);
		timer = setInterval(() => {
			changeSlide(n + 1);
		}, 5000);
		showSlide((index = n));
	};

	const showSlide = (n) => {
		const slides = document.getElementsByClassName("slide");
		if (n > slides.length) index = 1;
		if (n < 1) index = slides.length;
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slides[index - 1].style.display = "block";
	};
	showSlide(index);
});
