import { Initialize } from "./classes/user.js";
import { Task } from "./classes/task.js";
import { List } from "./classes/list.js";
document.addEventListener("DOMContentLoaded", (e) => {
	/*--------------------------------------------------------------------*/
	/** INITIALIZE PAGE
	 * Builds out task list with empty divs
	 */

	const init = new Initialize();
	init.initPage();

	/*--------------------------------------------------------------------*/
	// ELEMENTS
	/*--------------------------------------------------------------------*/
	/**
	 * TASKS
	 */
	const addTaskInput = document.getElementById("add-task-input");
	// const addTaskForm = document.querySelector(".add-task-form2");
	const addTaskButton = document.getElementById("add-task-button");
	const addedTasks = document.querySelector(".added-tasks");
	const allTasks = document.querySelector("#all-tasks");
	const completeBtn = document.querySelector("#complete-icon");
	const completedTasks = document.getElementById("completed");
	const trashIcon = document.getElementById("trash-icon");
	/*--------------------------------------------------------------------*/
	/**
	 * LISTS
	 */
	const lists = document.querySelector(".added-list-child-container");
	const currentList = document.querySelector(".current-list");
	const searchInput = document.getElementById("search-bar");
	const deleteListTrashButton = document.getElementById("trash-lists");
	const deleteListModel = document.querySelector(".delete-list-container");
	// const deleteListInput = document.getElementById("delete-list-input");
	const deleteListButton = document.getElementById("delete-list-button");
	// const deleteListForm = document.querySelector(".delete-list-form");
	const currListStats = document.querySelector(".current-list-stats");

	const numCompleted = document.querySelector(".num-complete");
	/*--------------------------------------------------------------------*/
	// GLOBAL VARIABLES
	let listId;
	let taskId;
	const task = new Task();
	const list = new List();
	task.getTotalTasks();
	task.getComplete();

	// const getNumCompleteInList = async () => {
	// 	try {
	// 		const res = await fetch(`/api/tasks/complete/${listId}`);
	// 		const data = await res.json();
	// 		const numComplete = data.length;
	// 		numCompleted.innerHTML = numComplete;

	// 		if (!data.message) {
	// 			return data;
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	/*--------------------------------------------------------------------*/

	/*--------------------------------------------------------------------*/
	// SHOW ADD TASK BUTTON LISTENER
	addTaskInput.addEventListener("focus", (e) => {
		addTaskButton.classList.remove("hide-button");
	});
	/*--------------------------------------------------------------------*/
	// HIDE ADD TASK BUTTON
	document.addEventListener("click", (e) => {
		if (e.target !== addTaskInput) {
			addTaskButton.classList.add("hide-button");
		}
	});
	/*--------------------------------------------------------------------*/
	// RENDER TASKS FROM SELECTED LIST
	lists.addEventListener("click", async (e) => {
		listId = e.target.id;
		list.renderList(listId, e);
	});
	/*--------------------------------------------------------------------*/
	/*--------------------------------------------------------------------*/
	// ADDING TASK TO PAGE AND DATABASE
	addTaskButton.addEventListener("click", async (e) => {
		e.preventDefault();
		// const task = new Task();
		task.addTask(listId);
	});
	/*--------------------------------------------------------------------*/
	// SELECTING TASKS
	addedTasks.addEventListener("click", async (e) => {
		taskId = !e.target.id ? e.target.dataset.id : e.target.id;
		task.getTaskDetails(taskId);
	});
	const detailCard = document.querySelector(".detail-card");
	const taskDetailsHead = document.querySelector(".edit");
	const taskName = document.querySelector(".task-name");
	const listName = document.querySelector(".list-drop-down");
	const closeTaskCard = document.getElementById("close-task-detail");
	closeTaskCard.addEventListener("click", (e) => {
		detailCard.classList.add("detail-card-hidden");
		detailCard.classList.remove("detail-card-active");
		document
			.querySelectorAll(".selected")
			.forEach((child) => child.classList.remove("selected"));
	});
	/*--------------------------------------------------------------------*/
	// DELETING TASKS FROM DATABASE AND PAGE
	trashIcon.addEventListener("click", async (e) => {
		task.deleteTask();
	});
	/*--------------------------------------------------------------------*/
	// FETCHING ALL TASKS
	allTasks.addEventListener("click", async (e) => {
		listId = undefined;
		currentList.innerHTML = "All Tasks";
		currListStats.innerHTML = "Stats for all tasks";
		try {
			const res = await fetch("/api/tasks");

			const data = await res.json();
			if (data.message !== "Failed") {
				addedTasks.innerHTML = "";
				task.getComplete();
				task.getTasks(data);
			}
		} catch (e) {
			console.error(e);
		}
	});
	searchInput.addEventListener("search", async (e) => {
		const val = searchInput.value;
		try {
			const res = await fetch(`/api/search/${val}`);
			const data = await res.json();
			if (!data.message) {
				currentList.innerHTML = "Search Results";
				addedTasks.innerHTML = "";
				task.getTasks(data);
			}
		} catch (e) {
			console.error(e);
		}
	});
	const addListButton = document.getElementById("add-list-button");
	const addListContainer = document.querySelector(".add-list-container");

	//Event listener to toggle add a list form
	addListButton.addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		addListContainer.classList.toggle("hide-list-container");
	});

	//get add a list button
	// const addListButton = document.getElementById("add-list-button")
	const addListForm = document.querySelector(".add-list-form");

	const submitListButton = document.getElementById("submit-list-button");

	//get added lists div container
	const listContainer = document.querySelector(".added-list-child-container");

	//add list input
	const listInput = document.getElementById("add-list-input");

	const closeListAddModal = document.getElementById("close-add-list");
	const closeListDeleteModal = document.getElementById("close-delete-list");

	//Event lister to create list on click of add list button
	submitListButton.addEventListener("click", async (e) => {
		e.preventDefault();
		// e.stopPropagation()

		const formData = new FormData(addListForm);

		const name = formData.get("name");

		const body = { name };

		list.addList(body);
	});
	closeListAddModal.addEventListener("click", (e) => {
		addListContainer.classList.toggle("hide-list-container");
	});

	//--------------------------------------------------------------
	// Delete an existing list

	const deleteListContainer = async () => {
		deleteListModel.classList.toggle("hide-list-container");
	};
	const closeListDelete = () => {
		deleteListModel.classList.toggle("hide-list-container");
	};
	const deleteList = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		list.deleteList();
	};

	closeListDeleteModal.addEventListener("click", closeListDelete);
	deleteListButton.addEventListener("click", deleteList);
	deleteListTrashButton.addEventListener("click", deleteListContainer);

	completeBtn.addEventListener("click", (e) => {
		task.completeTask(listId);
		// const tasks = document.querySelectorAll(".selected");
		// tasks.forEach(async (t) => {
		// 	taskId = !t.id ? t.dataset.id : t.id;
		// 	try {
		// 		const body = { completed: true };
		// 		const res = await fetch(`/api/tasks/${taskId}`, {
		// 			method: "PATCH",
		// 			body: JSON.stringify(body),
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 			},
		// 		});
		// 		const data = await res.json();
		// 		if (data.message === "Updated") {
		// 			addedTasks.removeChild(t);
		// 			if (!listId) {
		// 				task.getTotalTasks();
		// 				task.getComplete();
		// 			} else {
		// 				task.getTotalTasks();
		// 				getNumCompleteInList();
		// 			}
		// 			detailCard.classList.add("detail-card-hidden");
		// 			detailCard.classList.remove("detail-card-active");
		// 		}
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// });
	});

	completedTasks.addEventListener("click", async (e) => {
		listId = undefined;
		addedTasks.innerHTML = "";
		currentList.innerHTML = "Completed Tasks";
		task.getTotalTasks();
		const data = await task.getComplete();
		task.getTasks(data);
	});

	const editTaskSubmit = document.querySelector("#edit-task-btn");

	editTaskSubmit.addEventListener("click", async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const description = taskName.value;
		listId = listName.options[listName.selectedIndex].value;
		console.log(taskId);
		task.updateTask(taskId, listId, description);
	});
});
