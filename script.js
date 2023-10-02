const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//create Task
function addTask() {
  if (inputBox.value === "") {
    alert("you must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    inputBox.value = ""; // Clear the input box after adding a task
  }

  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    // e.target refers to the HTML element that was clicked, not the "listContainer." In this code, it checks if the clicked element's tag name is "LI" or "SPAN" and performs different actions accordingly.
    e.target.classList.toggle("checked"); //When you click an <li> element inside the "listContainer," e.target would be the clicked <li> element, and the code toggles the "checked" class on it.
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showData();
