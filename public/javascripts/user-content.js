document.addEventListener("DOMContentLoaded", (e) => {
  const addTaskInput = document.getElementById("add-task-input");
  const addTaskButton = document.getElementById("add-task-button");
  const taskContent = document.addTaskInput.addEventListener("focus", (e) => {
    addTaskButton.classList.remove("hide-button");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== addTaskInput) {
      addTaskButton.classList.add("hide-button");
    }
  });
  const boiler = `<input type="checkbox>
                  <p> ${val}`;
  addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    const val = addTaskInput.value;
    const div = document.createElement("div");
    div.appendChild();
    div.classList.add("filled");
    div.innerHTML = boiler;
  });
});
