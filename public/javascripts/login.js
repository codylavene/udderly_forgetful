document.addEventListener("DOMContentLoaded", (e) => {
	//get demo button
	const demoButton = document.querySelector(".demo-log");

	//get login in button
	const loginButton = document.querySelector(".btn");
	//get value of username input
	const email = document.getElementById("email");

	//get value of password input
	const password = document.getElementById("password");
	const quote = document.getElementById("quote");
	const author = document.getElementById("author");
	const fetchQuote = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		const randomI = Math.floor(Math.random() * data.length);
		quote.innerHTML = data[randomI].text;
		author.innerHTML = `-${data[randomI].author}-`;
	};
	const url = "https://type.fit/api/quotes";
	fetchQuote(url);
	demoButton.addEventListener("click", (e) => {
		e.preventDefault();

		email.value = "demouser@gmail.com";
		password.value = "Demo1!";

		loginButton.click();
	});
});
