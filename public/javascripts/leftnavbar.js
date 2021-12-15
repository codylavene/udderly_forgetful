window.addEventListener("DOMContentLoaded", () => {
  // const todayButton = document.querySelector('#today');
  // todayButton.addEventListener('click', e => {
  //     todayButton.style.color = '#d7e7f5'
  // })

  const allTaskButton = document.querySelector(".all-lists");
  const todayButton = document.querySelector("#today");
  const tomorrowButton = document.querySelector("#tomorrow");
  const thisWeekButton = document.querySelector("#this-week");
  const trashButton = document.querySelector("#trash");

  allTaskButton.addEventListener("click", (e) => {
    allTaskButton.appendChild(todayButton);
    allTaskButton.appendChild(tomorrowButton);
    allTaskButton.appendChild(thisWeekButton);
    allTaskButton.appendChild(trashButton);
    if (allTaskButton.children.length === 4) {
      // allTaskButton.innerText = "Expand List"
      allTaskButton.removeChild(todayButton);
      allTaskButton.removeChild(tomorrowButton);
      allTaskButton.removeChild(thisWeekButton);
      allTaskButton.removeChild(trashButton);
      // allTaskButton.removeEventListener()
    }
      allTaskButton.addEventListener("click", (e) => {
        if(allTaskButton.children.length === 0) {
        allTaskButton.innerText = "All Tasks";
        allTaskButton.appendChild(todayButton);
        allTaskButton.appendChild(tomorrowButton);
        allTaskButton.appendChild(thisWeekButton);
        allTaskButton.appendChild(trashButton);
          }
      });
  });




  const listsButton = document.querySelector('.added-lists')
  listsButton.addEventListener('click', e => {
      for( let i = 0; i <= listsButton.children.length; i++) {
          let listChildren = listsButton.children[i]
          listsButton.removeChild(listChildren)
      }
      if (!listChildren) {
          listsButton.appendChild()
      }
  })
});
