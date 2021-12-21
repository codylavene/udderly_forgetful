window.addEventListener("DOMContentLoaded", () => {
  const allTasksToggle = document.querySelector("#inbox-toggle");
  const taskCollapse = (e) => {
    const taskLists = document.querySelector(".inbox");
    taskLists.classList.toggle("collapsed");
    if (taskLists.classList.contains("collapsed")) {
      taskLists.innerHTML = "All Tasks";
    } else {
      taskLists.innerHTML = "Tasks";
    }
    const allLists = document.querySelector(".all-lists");
    allLists.classList.toggle("height-transition");
    // const allTasks = document.querySelector("#all-tasks");
    // allTasks.classList.toggle("height-transition");
    // const todayButton = document.querySelector("#today");
    // todayButton.classList.toggle("height-transition");
    // const tomorrowButton = document.querySelector("#tomorrow");
    // tomorrowButton.classList.toggle("height-transition");
    // const thisWeekButton = document.querySelector("#this-week");
    // thisWeekButton.classList.toggle("height-transition");
    // const trashButton = document.querySelector("#trash");
    // trashButton.classList.toggle("height-transition");
  };
  allTasksToggle.addEventListener("click", taskCollapse);

  const addedListButton = document.querySelector("#list-toggle");
  const listCollapse = (e) => {
    const children = document.querySelectorAll(".added-list-children");
    if (e.target.className === "added-list-children") {
      return;
    }
    children.forEach((child) => {
      child.classList.toggle("height-transition");
    });
  };
  addedListButton.addEventListener("click", listCollapse);
});
