document.addEventListener("DOMContentLoaded", (e) => {
  const addTaskInput = document.getElementById("add-task-input");
  const addTaskForm = document.querySelector(".add-task-form2");
  const addTaskButton = document.getElementById("add-task-button");
  const addedTasks = document.querySelector(".added-tasks");
  const lists = document.querySelector(".added-lists");
  const trashIcon = document.getElementById("trash-icon");
  const emptyTaskInit = document.querySelector(".empty-task-template");
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
  lists.addEventListener("click", (e) => {
    listId = e.target.id;
    console.log(listId);
    localStorage.setItem("current_list", listId);
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
    // const email = formData.get("email");
    // const password = formData.get("password");

    const body = { description, listId };
    try {
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
        // div.classList.add("filled");
        div.id = data.task.id;
        console.log(div.id);
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
    if (task) {
      try {
        const res = await fetch(`/api/tasks/${taskId}`, {
          method: "DELETE",
          // body: JSON.stringify({ taskId: taskId }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        if (!res.ok) throw res;
        const data = await res.json();
        console.log(data);
        if (data.message === "Destroyed") {
          addedTasks.removeChild(task);
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
});
