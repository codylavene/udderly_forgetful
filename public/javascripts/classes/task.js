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

	getTasks(userId) {}

	updateTask(taskId) {}

	deleteTask() {}

	buildTask(data, val) {
		const addedTasks = document.querySelector(".added-tasks");
		const div = document.createElement("div");
		div.id = data.task.id;
		div.classList.add("pre-filled");
		const boiler = `<div class="filled" data-id=${data.task.id}><input type="checkbox" data-id=${data.task.id}><p data-id=${data.task.id}>${val}</p></div>`;
		div.innerHTML = boiler;
		document.querySelector(".added-tasks").appendChild(div);
		document.getElementById("add-task-input").value = "";
		document.getElementById("add-task-input").blur();
	}

	getComplete(userId) {}

	getTotalTasks() {}
}
