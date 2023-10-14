// Array that contains the tasks
let tasks = [];

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to retrieve tasks from local storage
function getTasksFromLocalStorage() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

// Read function: displays tasks in the UI
function read() {
  let tasksContainer = document.querySelector("#lists-container");
  tasksContainer.innerHTML = "";

  let index = 0;
  for (let task of tasks) {
    // Create a list item for each task
    let content = `<li>${task.title}<span onclick="deleteTask(${index})">\u00d7</span></li>`;
    tasksContainer.innerHTML += content;
    index++;
  }
}

// Create function: adds a new task to the tasks array and updates the UI
let addBtn = document.querySelector("#add-task");
let input = document.querySelector("input");
addBtn.addEventListener("click", function () {
  let value = input.value;
  if (value.length != 0) {
    // Create a task object and push it to the tasks array
    let taskObj = {
      "title": value,
      "isDone": false,
    };
    tasks.push(taskObj);
    saveTasksToLocalStorage(); // Save tasks to local storage
    read(); // Update the UI with the new task
    input.value = ""; // Clear the input field
  } else {
    alert("Please enter a task");
  }
});

// Delete function: removes a task from the tasks array and updates the UI
function deleteTask(index) {
  let taskName = tasks[index].title;
  let isConfirmed = confirm(`Are you sure you want to delete "${taskName}"?`);
  if (isConfirmed) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage(); // Save tasks after deletion
    read(); // Update the UI after deleting the task
  }
}

// Initialize: Retrieve tasks from local storage when the page loads
getTasksFromLocalStorage();

// Display tasks immediately when the page loads
read();

// Complete Task function: marks a task as completed and updates the UI
document.querySelector("#lists-container").addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
});
