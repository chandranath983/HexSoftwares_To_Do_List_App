const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const cancelEdit = document.getElementById("cancelEdit");
const saveEdit = document.getElementById("saveEdit");
const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentEditIndex = null;
let currentDeleteIndex = null;

function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
	const completed = tasks.filter((t) => t.completed).length;
	taskCounter.textContent = `${completed}/${tasks.length} Completed`;
}

function renderTasks() {
	taskList.innerHTML = "";

	if (tasks.length === 0) {
		taskList.innerHTML = "<p style='color:#9ca3af'>No tasks yet...</p>";
	}

	tasks.forEach((task, index) => {
		const li = document.createElement("li");
		li.className = task.completed ? "completed" : "";

		li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

		li.querySelector("input").addEventListener("change", () => {
			tasks[index].completed = !tasks[index].completed;
			saveTasks();
			renderTasks();
		});

		li.querySelector(".edit-btn").addEventListener("click", () => {
			currentEditIndex = index;
			editInput.value = task.text;
			editModal.style.display = "flex";
		});

		li.querySelector(".delete-btn").addEventListener("click", () => {
			currentDeleteIndex = index;
			deleteModal.style.display = "flex";
		});

		taskList.appendChild(li);
	});

	updateCounter();
}


addBtn.addEventListener("click", () => {
	const text = taskInput.value.trim();
	if (!text) return;

	tasks.push({ text, completed: false });
	taskInput.value = "";
	saveTasks();
	renderTasks();
});

taskInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") addBtn.click();
});

saveEdit.addEventListener("click", () => {
	const newText = editInput.value.trim();
	if (newText) {
		tasks[currentEditIndex].text = newText;
		saveTasks();
		renderTasks();
	}
	editModal.style.display = "none";
});

cancelEdit.addEventListener("click", () => {
	editModal.style.display = "none";
});

confirmDelete.addEventListener("click", () => {
	tasks.splice(currentDeleteIndex, 1);
	saveTasks();
	renderTasks();
	deleteModal.style.display = "none";
});



cancelDelete.addEventListener("click", () => {
	deleteModal.style.display = "none";
});

window.addEventListener("click", (e) => {
	if (e.target === editModal) editModal.style.display = "none";
	if (e.target === deleteModal) deleteModal.style.display = "none";
});

function updateClock() {
	const clock = document.getElementById("clock");
	const now = new Date();
	clock.textContent = now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();
renderTasks();

