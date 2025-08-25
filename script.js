let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

// Load saved tasks when page opens
window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
};

// Add a new task
function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = "";
}

// ✅ Create task element
function createTaskElement(taskText, completed) {
  let li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" onclick="toggleTask(this)" ${completed ? "checked" : ""}>
    <span class="${completed ? "completed" : ""}">${taskText}</span>
    <div>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>
    </div>
  `;
  taskList.appendChild(li);
}

// ✅ Mark as completed
function toggleTask(checkbox) {
  let span = checkbox.parentElement.querySelector("span");
  span.classList.toggle("completed", checkbox.checked);
  saveTasks();
}

// Edit a task
function editTask(button) {
  let li = button.parentElement.parentElement;
  let span = li.querySelector("span");
  let newTask = prompt("Edit your task:", span.innerText);

  if (newTask !== null && newTask.trim() !== "") {
    span.innerText = newTask;
    saveTasks();
  }
}

// Delete a task
function deleteTask(button) {
  let li = button.parentElement.parentElement;
  li.remove();
  saveTasks();
}

// ✅ Save all tasks to localStorage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    let text = li.querySelector("span").innerText;
    let completed = li.querySelector("input").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
