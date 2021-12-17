document.addEventListener("DOMContentLoaded", (e) => {

    //get demo button
    const demoButton = document.querySelector(".demo-log")

    //get value of username input
    const username = document.getElementById("emailAddress")

    //get value of password input
    const password = document.getElementById("password")

    demoButton.addEventListener("click", e => {
        e.preventDefault()

        username.value = "Demo-User"
        username.password = "Shhtevebarca16!"



    })
});