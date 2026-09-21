// ============================================
// TO-DO LIST APP - JavaScript Logic
// ============================================

// Step 1: Grab references to the HTML elements we need to work with
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Step 2: This array holds all our tasks in memory.
// Each task looks like: { text: "Buy milk", completed: false }
let tasks = [];

// ============================================
// LOCAL STORAGE FUNCTIONS
// (This is how we make tasks "remembered" even after closing the tab)
// ============================================

// Save the current tasks array into the browser's localStorage
function saveTasks() {
  // localStorage can only store strings, so we convert our array to a JSON string
  localStorage.setItem("myTodoTasks", JSON.stringify(tasks));
}

// Load tasks from localStorage when the page first opens
function loadTasks() {
  const savedTasks = localStorage.getItem("myTodoTasks");
  if (savedTasks) {
    // Convert the JSON string back into a real JavaScript array
    tasks = JSON.parse(savedTasks);
  }
}

// ============================================
// RENDER FUNCTION
// (This draws the current tasks array onto the screen)
// ============================================

function renderTasks() {
  // Clear out whatever is currently shown
  taskList.innerHTML = "";

  // Loop through every task and create an <li> element for it
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");

    // If the task is completed, add the "completed" class for styling
    if (task.completed) {
      li.classList.add("completed");
    }

    // Checkbox to mark task as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleComplete(index);
    });

    // The task's text
    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");
    span.addEventListener("click", function () {
      toggleComplete(index);
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteTask(index);
    });

    // Put the checkbox, text, and delete button into the <li>
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add the finished <li> to the task list on the page
    taskList.appendChild(li);
  });
}

// ============================================
// TASK ACTIONS
// ============================================

// Add a new task
function addTask() {
  const text = taskInput.value.trim(); // remove extra spaces

  // Don't add empty tasks
  if (text === "") {
    return;
  }

  tasks.push({ text: text, completed: false });

  taskInput.value = ""; // clear the input box

  saveTasks();
  renderTasks();
}

// Mark a task as completed / not completed
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete a single task
function deleteTask(index) {
  tasks.splice(index, 1); // removes 1 item at position "index"
  saveTasks();
  renderTasks();
}

// Remove all tasks that are marked as completed
function clearCompleted() {
  tasks = tasks.filter(function (task) {
    return !task.completed; // keep only tasks that are NOT completed
  });
  saveTasks();
  renderTasks();
}

// ============================================
// EVENT LISTENERS
// ============================================

// When the "Add" button is clicked
addTaskBtn.addEventListener("click", addTask);

// Allow pressing "Enter" in the input box to also add a task
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// When "Clear Completed" is clicked
clearCompletedBtn.addEventListener("click", clearCompleted);

// ============================================
// STARTUP
// ============================================

// When the page first loads, load any saved tasks and display them
loadTasks();
renderTasks();
