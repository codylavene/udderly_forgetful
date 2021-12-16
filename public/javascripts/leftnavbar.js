
window.addEventListener("DOMContentLoaded", () => {

  const AllTasks = document.querySelector("all-tasks");
  const hamburgerHelper = (e) => {
    e.stopPropagation()
    const todayButton = document.querySelector("#today");
    todayButton.classList.toggle("height-transition");
    const tomorrowButton = document.querySelector("#tomorrow");
    tomorrowButton.classList.toggle("height-transition");
    const thisWeekButton = document.querySelector('#this-week')
    thisWeekButton.classList.toggle("height-transition");
    const trashButton = document.querySelector("#trash");
    trashButton.classList.toggle("height-transition");
  };
    lists.addEventListener('click', hamburgerHelper)

  // const addedListButton = document.querySelector('lists')
  // const cheeseburgerHelper = (e) => {
  //   if (e.target !== list) {
  //     e.stopPropagation()
  //   }
  //   const children = document.querySelectorAll('.added-list-children');
  //   children.forEach(child => {
  //     child.classList.toggle("height-transition");
  //   })
  // };
  // addedListButton.addEventListener('click', cheeseburgerHelper)
});
