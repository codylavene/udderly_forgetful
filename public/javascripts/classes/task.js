export class Task {
	async addTask(listId) {
		const addTaskForm = document.querySelector(".add-task-form2");

		const formData = new FormData(addTaskForm);
		const description = formData.get("description");
		console.log(description);

		try {
			let body = { description };
			if (listId) {
				body = { description, listId };
			}
			const res = await fetch("/api/tasks", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!res.ok) {
				throw res;
			}
			const data = await res.json();
			if (data.message === "Success") {
				this.buildTask(data, description);
				this.getTotalTasks();
				this.getComplete();
			}
		} catch (e) {
			console.error(e);
		}
	}

	getTasks(data) {
		data.forEach((task) => {
			const div = document.createElement("div");
			div.id = task.id;
			div.classList.add("pre-filled");
			const boiler = `<div class="filled" data-id=${task.id}><input type="checkbox" data-id=${task.id}><p data-id=${task.id}>${task.description}</p></div>`;
			div.innerHTML = boiler;
			document.querySelector(".added-tasks").appendChild(div);
			this.getTotalTasks();
			this.getComplete();
		});
	}

	async updateTask(taskId, listId, description) {
		try {
			let body = { description };
			if (listId != "null") {
				body = { description, listId };
			} else {
				body = { description, listId: null };
			}
			const res = await fetch(`/api/tasks/${taskId}`, {
				method: "PATCH",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			if (data.message === "Updated") {
				try {
					const newRes = await fetch(`/api/tasks/`);

					const data = await newRes.json();

					if (!data.message) {
						document.querySelector(".added-tasks").innerHTML = "";
						this.getTasks(data);
						document
							.querySelector(".detail-card")
							.classList.add("detail-card-hidden");
						document
							.querySelector(".detail-card")
							.classList.remove("detail-card-active");
						document.querySelector(".current-list").innerHTML =
							"All Tasks";
						document.querySelector(
							".current-list-stats"
						).innerHTML = "Stats for all tasks";
					}
				} catch (e) {
					console.error(e);
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	async deleteTask() {
		const tasks = document.querySelectorAll(".selected");
		const num = tasks.length;
		tasks.forEach(async (task) => {
			let taskId = !task.id ? task.dataset.id : task.id;
			try {
				const res = await fetch(`/api/tasks/${taskId}`, {
					method: "DELETE",
				});

				// if (!res.ok) throw res;
				const data = await res.json();
				if (data.message === "Destroyed") {
					document.querySelector(".added-tasks").removeChild(task);
					const taskName = document.querySelector(".task-name");
					const listName = document.querySelector(".list-drop-down");
					this.getTotalTasks();
					this.getComplete();
					document
						.querySelector(".detail-card")
						.classList.add("detail-card-hidden");
					document
						.querySelector(".detail-card")
						.classList.remove("detail-card-active");
				}
			} catch (e) {
				console.error(e);
			}
		});
	}

	buildTask(data, val) {
		const div = document.createElement("div");
		div.id = data.task.id;
		div.classList.add("pre-filled");
		const boiler = `<div class="filled" data-id=${data.task.id}><input type="checkbox" data-id=${data.task.id}><p data-id=${data.task.id}>${val}</p></div>`;
		div.innerHTML = boiler;
		document.querySelector(".added-tasks").appendChild(div);
		document.getElementById("add-task-input").value = "";
		document.getElementById("add-task-input").blur();
	}

	async getComplete() {
		try {
			const res = await fetch("/api/tasks/complete");
			const data = await res.json();
			const numComplete = data.length;
			document.querySelector(".num-complete").innerHTML = numComplete;

			if (!data.message) {
				return data;
			}
		} catch (e) {
			console.error(e);
		}
	}

	getTotalTasks() {
		const numTasks = document.querySelectorAll(".pre-filled").length;
		document.querySelector(".num-tasks").innerHTML = numTasks;
	}
}
