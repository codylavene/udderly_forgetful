window.addEventListener("DOMContentLoaded", () => {
  const allTasks = document.querySelector("#all-tasks");
  const taskCollapse = (e) => {
    const todayButton = document.querySelector("#today");
    todayButton.classList.toggle("height-transition");
    const tomorrowButton = document.querySelector("#tomorrow");
    tomorrowButton.classList.toggle("height-transition");
    const thisWeekButton = document.querySelector("#this-week");
    thisWeekButton.classList.toggle("height-transition");
    const trashButton = document.querySelector("#trash");
    trashButton.classList.toggle("height-transition");
  };
  allTasks.addEventListener("click", taskCollapse);

  const addedListButton = document.querySelector(".list");
  const listCollapse = (e) => {
    const children = document.querySelectorAll(".added-list-children");
    // console.log(e.target.className);
    if (e.target.className === "added-list-children") {
      return;
    }
    children.forEach((child) => {
      child.classList.toggle("height-transition");
    });
  };
  addedListButton.addEventListener("click", listCollapse);
});
