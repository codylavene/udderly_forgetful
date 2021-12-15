window.addEventListener("DOMContentLoaded", () => {

    const todayButton = document.querySelector('.today');
    todayButton.addEventListener('click', e => {
        todayButton.classList.add("red")
    })
})
