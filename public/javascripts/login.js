document.addEventListener("DOMContentLoaded", (e) => {
  //get demo button
  const demoButton = document.querySelector(".demo-log");

  //get login in button
  const loginButton = document.querySelector(".btn");
  //get value of username input
  const email = document.getElementById("email");

  //get value of password input
  const password = document.getElementById("password");

  demoButton.addEventListener("click", (e) => {
    e.preventDefault();

    email.value = "demouser@gmail.com";
    password.value = "Demo1!";

    loginButton.click();
  });
});
