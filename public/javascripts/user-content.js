document.addEventListener("DOMContentLoaded", (e) => {
  const addTaskInput = document.getElementById("add-task-input");
  const addTaskButton = document.getElementById("add-task-button");

  addTaskInput.addEventListener("focus", (e) => {
    addTaskButton.classList.remove("hide-button");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== addTaskInput) {
      addTaskButton.classList.add("hide-button");
    }
  });
  addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    const val = addTaskInput.value;
    const div = document.createElement("div");
    div.appendChild();
    div.classList.add("filled");
    const boiler = `<input type="checkbox>
                    <p> ${val}`;
    div.innerHTML = boiler;
  });
});
