window.addEventListener("DOMContentLoaded", () => {
	const allTasksToggle = document.querySelector("#inbox-toggle");
	const taskCollapse = (e) => {
		const taskLists = document.querySelector(".inbox");
		taskLists.classList.toggle("collapsed");
		if (taskLists.classList.contains("collapsed")) {
			taskLists.innerHTML = "All Tasks";
		} else {
			taskLists.innerHTML = "Tasks";
		}
		const allLists = document.querySelector(".all-lists");
		allLists.classList.toggle("height-transition");
	};
	allTasksToggle.addEventListener("click", taskCollapse);

	const addedListButton = document.querySelector("#list-toggle");
	const listCollapse = (e) => {
		const children = document.querySelector(".added-list-child-container");
		if (e.target.className === "added-list-children") {
			return;
		}
		children.classList.toggle("height-transition");
		// children.forEach((child) => {
		//   child.classList.toggle("height-transition");
		// });
	};
	addedListButton.addEventListener("click", listCollapse);
});
