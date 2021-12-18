document.addEventListener("DOMContentLoaded", (e) => {
  const addTaskInput = document.getElementById("add-task-input");
  const addTaskForm = document.querySelector(".add-task-form2");
  const addTaskButton = document.getElementById("add-task-button");
  const addedTasks = document.querySelector(".added-tasks");
  const lists = document.querySelector(".added-list-child-container");
  const trashIcon = document.getElementById("trash-icon");
  const emptyTaskInit = document.querySelector(".empty-task-template");
  const allTasks = document.querySelector("#all-tasks");
  for (let i = 0; i < 70; i++) {
    const div = document.createElement("div");
    emptyTaskInit.appendChild(div);
  }
  let listId;
  let taskId;
  /*--------------------------------------------------------------------*/
  addTaskInput.addEventListener("focus", (e) => {
    addTaskButton.classList.remove("hide-button");
  });
  /*--------------------------------------------------------------------*/
  lists.addEventListener("click", async (e) => {
    listId = e.target.id;
    const currentList = document.querySelector(".current-list");
    currentList.innerHTML = e.target.innerHTML;
    const res = await fetch(`/api/lists/${listId}`);

    const data = await res.json();
    if (data.message !== "Failed") {
      addedTasks.innerHTML = "";
      data.forEach((task) => {
        const div = document.createElement("div");
        div.id = task.id;
        const boiler = `<div class="filled" id=${task.id}><input type="checkbox" id=${task.id}><p id=${task.id}>${task.description}</p></div>`;
        div.innerHTML = boiler;
        addedTasks.appendChild(div);
      });
    }
  });
  /*--------------------------------------------------------------------*/
  document.addEventListener("click", (e) => {
    if (e.target !== addTaskInput) {
      addTaskButton.classList.add("hide-button");
    }
  });
  /*--------------------------------------------------------------------*/
  addTaskButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(addTaskForm);

    const description = formData.get("description");

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
        const val = addTaskInput.value;
        const div = document.createElement("div");
        div.id = data.task.id;
        const boiler = `<div class="filled" id=${data.task.id}><input type="checkbox" id=${data.task.id}><p id=${data.task.id}>${val}</p></div>`;
        div.innerHTML = boiler;
        addedTasks.appendChild(div);
        addTaskInput.value = "";
      }
    } catch (e) {
      console.error(e);
    }
  });
  addedTasks.addEventListener("click", (e) => {
    taskId = e.target.id;
    console.log(taskId);
    e.target.style.color = "red";
  });

  trashIcon.addEventListener("click", async (e) => {
    const task = document.getElementById(taskId);
    console.log(task);

    try {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });

      // if (!res.ok) throw res;
      const data = await res.json();
      console.log(data);
      if (data.message === "Destroyed") {
        addedTasks.removeChild(task);
      } else {
        console.log("failed");
      }
    } catch (e) {
      console.error(e);
    }
  });

  allTasks.addEventListener("click", async (e) => {
    try {
      const res = await fetch("/api/tasks");

      const data = await res.json();
      console.log(data);
      if (data.message !== "Failed") {
        addedTasks.innerHTML = "";
        data.forEach((task) => {
          const div = document.createElement("div");
          div.id = task.id;
          const boiler = `<div class="filled" id=${task.id}><input type="checkbox" id=${task.id}><p id=${task.id}>${task.description}</p></div>`;
          div.innerHTML = boiler;
          addedTasks.appendChild(div);
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
});
