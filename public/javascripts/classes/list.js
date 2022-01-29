import { Task } from "./task.js";

export class List {
	async addList(body) {
		try {
			const res = await fetch("/api/lists", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();

			if (!data.message) {
				const div = document.createElement("div");
				const option = document.createElement("option");
				const optionForEdit = document.createElement("option");
				div.id = data.id;
				option.value = data.id;
				optionForEdit.value = data.id;
				div.classList.add("added-list-children");
				div.innerHTML = data.name;
				option.innerHTML = data.name;
				optionForEdit.innerHTML = data.name;
				document
					.querySelector(".added-list-child-container")
					.appendChild(div);
				document
					.getElementById("delete-list-input")
					.appendChild(option);
				document
					.querySelector(".list-drop-down")
					.appendChild(optionForEdit);
				document.getElementById("add-list-input").value = "";
				document
					.querySelector(".add-list-container")
					.classList.toggle("hide-list-container");
			}
		} catch (e) {
			console.error(e);
		}
	}

	getCurrList() {}

	async renderList(listId, e) {
		let task = new Task();

		document.querySelector(".current-list").innerHTML = e.target.innerHTML;
		document.querySelector(
			".current-list-stats"
		).innerHTML = `Stats for ${e.target.innerHTML} list`;
		const res = await fetch(`/api/lists/${listId}`);

		const data = await res.json();
		if (data.message !== "Failed") {
			document.querySelector(".added-tasks").innerHTML = "";
			task.getTasks(data);
			task.getTotalTasks();
			console.log("<><><><><>", listId);
			this.getNumCompleteInList(listId);
		}

		document.querySelector(".current-list").innerHTML = e.target.innerHTML;
	}

	async deleteList() {
		const deleteListInput = document.getElementById("delete-list-input");
		const listName = document.querySelector(".list-drop-down");

		const selected = deleteListInput.options[deleteListInput.selectedIndex];
		const id = selected.value;
		const res = await fetch(`/api/lists/${id}`, {
			method: "Delete",
		});
		const data = await res.json();
		if (data.message === "Destroyed") {
			deleteListInput.removeChild(selected);
			const children = document.querySelector(
				".added-list-child-container"
			).children;
			for (let i = 0; i < children.length; i++) {
				let child = children[i];
				if (child.id === id) {
					document
						.querySelector(".added-list-child-container")
						.removeChild(child);
				}
			}
			Array.from(listName.children).forEach((child) => {
				if (child.value === id) {
					listName.removeChild(child);
				}
			});
		}
	}

	async getNumCompleteInList(listId) {
		console.log(listId);
		try {
			const res = await fetch(`/api/tasks/complete/${listId}`);
			const data = await res.json();
			const numComplete = data.length;
			console.log(numComplete);
			document.querySelector(".num-complete").innerText = numComplete;
			console.log(document.querySelector(".num-complete"));
			if (!data.message) {
				return data;
			}
		} catch (e) {
			console.error(e);
		}
	}
}
