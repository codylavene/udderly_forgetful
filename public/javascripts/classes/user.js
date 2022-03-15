export class Initialize {
	initPage() {
		for (let i = 0; i < 70; i++) {
			const div = document.createElement("div");
			document.querySelector(".empty-task-template").appendChild(div);
		}
	}
}
