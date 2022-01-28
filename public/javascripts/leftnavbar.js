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

	// const addListButton = document.getElementById("add-list-button");
	// const addListContainer = document.querySelector(".add-list-container");

	// //Event listener to toggle add a list form
	// addListButton.addEventListener("click", (e) => {
	//   e.stopPropagation();
	//   e.preventDefault();
	//   addListContainer.classList.toggle("hide-list-container");
	// });

	// //get add a list button
	// // const addListButton = document.getElementById("add-list-button")
	// const addListForm = document.querySelector(".add-list-form");

	// const submitListButton = document.getElementById("submit-list-button");

	// //get added lists div container
	// const listContainer = document.querySelector(".added-list-child-container");

	// //add list input
	// const listInput = document.getElementById("add-list-input");

	// //Event lister to create list on click of add list button
	// submitListButton.addEventListener("click", async (e) => {
	//   e.preventDefault();
	//   // e.stopPropagation()

	//   const formData = new FormData(addListForm);

	//   console.log(formData);

	//   const name = formData.get("name");

	//   console.log({ name });

	//   const body = { name };

	//   try {
	//     const res = await fetch("/api/lists", {
	//       method: "POST",
	//       body: JSON.stringify(body),
	//       headers: {
	//         "Content-Type": "application/json",
	//       },
	//     });

	//     const data = await res.json();

	//     console.log({ data });

	//     if (!data.message) {
	//       const div = document.createElement("div");
	//       div.id = data.id;
	//       div.classList.add("added-list-children");
	//       div.innerHTML = data.name;
	//       listContainer.appendChild(div);
	//       listInput.value = "";
	//       addListContainer.classList.toggle("hide-list-container");
	//     }
	//   } catch (e) {
	//     console.error(e);
	//   }
	// });
});
