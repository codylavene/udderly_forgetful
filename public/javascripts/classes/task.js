import { List } from "./list.js";

export class Task {

    async getAllTasks(e) {

        const currentList = document.querySelector(".current-list");
        const currListStats = document.querySelector(".current-list-stats");
        const addedTasks = document.querySelector(".added-tasks");

        currentList.innerHTML = "All Tasks";
        currListStats.innerHTML = "Stats for all tasks";
        try {
            const res = await fetch("/api/tasks");

            const data = await res.json();
            if (data.message !== "Failed") {
                addedTasks.innerHTML = "";
                this.getComplete();
                this.getTasks(data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async addTask(listId) {
        const list = new List();
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
                // if (!listId) {
                this.getComplete();
                // } else {
                //     list.getNumCompleteInList
                // }
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
        });
        this.getTotalTasks();
        // this.getComplete();
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
        const numTasks = document.querySelectorAll(".pre-filled")
            ? document.querySelectorAll(".pre-filled").length
            : 0;

        console.log(numTasks);
        document.querySelector(".num-tasks").innerHTML = numTasks;
    }

    async getTaskDetails(taskId) {
        const detailCard = document.querySelector(".detail-card");
        const taskDetailsHead = document.querySelector(".edit");
        const taskName = document.querySelector(".task-name");
        const listName = document.querySelector(".list-drop-down");

        const taskDiv = document.getElementById(taskId);



        // if (taskDiv.classList.contains("pre-filled")) {

        const taskCheck = document.querySelector(`input[data-id="${taskId}"]`)
        taskCheck.checked = !taskCheck.checked
        taskDiv.classList.toggle("selected");
        if (taskDiv.classList.contains("selected")) {
            taskCheck.checked = true
        } else {
            taskCheck.checked = false
        }
        detailCard.classList.remove("detail-card-hidden");
        detailCard.classList.add("detail-card-active");
        /*--------------------------------------------------------------------*/
        // FETCHING TASK DETAILS
        try {
            const res = await fetch(`/api/tasks/${taskId}`);

            const data = await res.json();
            if (!data.message) {
                const selected = document.querySelectorAll(".selected");
                const editForm = document.querySelector(".edit-task");
                // const
                if (selected.length > 1) {
                    taskDetailsHead.innerHTML = `${selected.length} tasks selected`;
                    // editForm.disabled = "true";
                    editForm.classList.add("detail-card-hidden");
                    editForm.classList.remove("detail-form-active");
                } else if (selected.length === 1) {
                    taskDetailsHead.innerHTML = `Edit Task Details`;
                    editForm.classList.remove("detail-card-hidden");
                    editForm.classList.add("detail-form-active");
                    if (taskDiv.classList.contains("selected")) {
                        // taskName.dataset.taskId = taskId;
                        taskName.value = data.description;
                        // listName.innerHTML = !data.List;
                        if (data.List) {
                            Array.from(listName.children).forEach((child) => {
                                if (child.value == data.List.id) {
                                    child.selected = "true";
                                }
                            });
                        } else {
                            document.getElementById("null").selected = "true";
                        }
                    } else {
                        // editForm.classList.toggle("detail-card-hidden");

                        try {
                            const res = await fetch(
                                `/api/tasks/${selected[0].id}`
                            );
                            const data = await res.json();
                            taskName.value = data.description;
                            if (data.list) {
                                Array.from(listName.children).forEach(
                                    (child) => {
                                        if (child.value == data.List.id) {
                                            child.selected = "true";
                                        }
                                    }
                                );
                            } else {
                                document.getElementById("null").selected =
                                    "true";
                            }
                            // listName.innerHTML = `List Name: ${data.List.name}`;
                        } catch (e) {
                            console.error(e);
                        }
                    }
                } else {
                    // taskName.innerHTML = "";
                    // listName.innerHTML = "";
                    detailCard.classList.add("detail-card-hidden");
                    detailCard.classList.remove("detail-card-active");
                    editForm.classList.add("detail-card-hidden");
                    editForm.classList.remove("detail-form-active");
                }
            }
        } catch (e) {
            console.error(e);
        }
        // }
    }

    completeTask(listId) {
        const tasks = document.querySelectorAll(".selected");
        const detailCard = document.querySelector(".detail-card");
        const list = new List();
        tasks.forEach(async (t) => {
            let taskId = !t.id ? t.dataset.id : t.id;
            try {
                const body = { completed: true };
                const res = await fetch(`/api/tasks/${taskId}`, {
                    method: "PATCH",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                if (data.message === "Updated") {
                    document.querySelector(".added-tasks").removeChild(t);
                    if (!listId) {
                        this.getTotalTasks();
                        this.getComplete();
                    } else {
                        this.getTotalTasks();
                        list.getNumCompleteInList(listId);
                    }
                    detailCard.classList.add("detail-card-hidden");
                    detailCard.classList.remove("detail-card-active");
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
}
