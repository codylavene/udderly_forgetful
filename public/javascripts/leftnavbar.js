

window.addEventListener("DOMContentLoaded", () => {

    // const todayButton = document.querySelector('#today');
    // todayButton.addEventListener('click', e => {
    //     todayButton.style.color = '#d7e7f5'
    // })
    const allTaskButton = document.querySelector('.all-lists');
    const todayButton = document.querySelector('#today');
    const tomorrowButton = document.querySelector('#tomorrow')
    const thisWeekButton = document.querySelector('#this-week')
    const trashButton = document.querySelector('#trash')
    allTaskButton.addEventListener('click', e => {
        todayButton.style.color = '#d7e7f5'
        tomorrowButton.style.color = '#d7e7f5'
        thisWeekButton.style.color = '#d7e7f5'
        trashButton.style.color = '#d7e7f5'
    })
    // allTaskButton.addEventListener('mouseover', e => {
    //     e.target.style.color = 'red'
    //     e.stopPropagation()
    // })
    const listsButton = document.querySelector('.added-lists')
    listsButton.addEventListener('click', e => {
        list
    })
});
