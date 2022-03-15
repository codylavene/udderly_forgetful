document.addEventListener("DOMContentLoaded", (e) => {
	const demoButton = document.getElementById("demo-button");

	// demoButton.addEventListener("click", async (e) => {
	//     e.stopPropagation()
	//     e.preventDefault()

	//     //do fetch call to /login with demo user info.

	//     try {

	//         await fetch("http://localhost:8080/users/login", {
	//             method: "POST",
	//             body: new URLSearchParams({
	//                 'username': "demouser",
	//                 'password': "Demo1!"
	//             }),
	//             headers: {
	//                 "Content-Type": "application/x-www-form-urlencoded",
	//             },
	//         });
	//     } catch (e) {
	//         console.log(e)
	//     }

	// })
});

//new URLSearchParams  username=demouser&password=Demo1!
