document.addEventListener("DOMContentLoaded", (e) => {
  const addTaskInput = document.getElementById("add-task-input");
  const addTaskButton = document.getElementById("add-task-button");
  const addedTasks = document.querySelector(".added-tasks");
  const lists = document.querySelector(".added-lists");
  let listId;
  /*--------------------------------------------------------------------*/
  addTaskInput.addEventListener("focus", (e) => {
    addTaskButton.classList.remove("hide-button");
  });
  /*--------------------------------------------------------------------*/
  lists.addEventListener("click", (e) => {
    listId = e.target.id;
  });
  /*--------------------------------------------------------------------*/
  document.addEventListener("click", (e) => {
    if (e.target !== addTaskInput) {
      addTaskButton.classList.add("hide-button");
    }
  });
  /*--------------------------------------------------------------------*/
  addTaskButton.addEventListener("click", async (e) => {
    e.target.preventDefault();
    const val = addTaskInput.value;
    const div = document.createElement("div");
    div.classList.add("filled");
    const boiler = `<input type="checkbox"><p> ${val} </p>`;
    div.innerHTML = boiler;
    addedTasks.appendChild(div);
    addTaskInput.value = "";
    // let description = val;
    // const task = await db.Task.create({ description });
    // await fetch("/api/tasks");
  });
});
