document.addEventListener("DOMContentLoaded", (e) => {
	const searchCon = document.querySelector(".search-container");
	const searchIcon = document.getElementById("search-icon");
	const searchInput = document.getElementById("search-bar");
	// searchCon.addEventListener("click", (e) => {
	//   searchIcon.style.color = "black";
	// });
	document.addEventListener("click", (e) => {
		if (
			e.target === searchCon ||
			e.target === searchInput ||
			e.target === searchIcon
		) {
			searchIcon.style.color = "rgba(135, 135, 135, 0.7)";
		} else {
			searchIcon.style.color = "rgba(255, 255, 255, 0.7)";
		}
	});

	const logoutBtn = document.querySelector(".logout-container");

	const signout = async (e) => {
		try {
			const res = await fetch("/users/logout", { method: "POST" });
			if (res.redirected) {
				window.location.href = res.url;
			}
		} catch (err) {
			console.info(err + " url: " + "/users/logout");
		}
	};

	const ham = document.querySelector(".hamburger-container");
	const hamburgerHelper = (e) => {
		const taskContent = document.querySelector(".task-container");
		const lists = document.querySelector(".left-nav-bar");
		lists.classList.toggle("height-transition");
		taskContent.classList.toggle("task-full-screen");
	};
	logoutBtn.addEventListener("click", signout);
	ham.addEventListener("click", hamburgerHelper);
	/*--------------------------------------------------------------------*/
	// SEARCH FETCH
});
