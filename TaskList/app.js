// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");

const clearBtn = document.querySelector(".clear-tasks.btn");

const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM loaded Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Add remove event
  taskList.addEventListener("click", removeTask);
  //Clear all task event
  clearBtn.addEventListener("click", removeTasks);

  // Filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// Filter the tasks
// Any time a key moves up. it is event
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // move over all of the tasks (the li)
  document.querySelectorAll(".collection-item").forEach(function (item) {
    // for each li , check match
    task = item.textContent.toLowerCase();
    if (task.indexOf(text) != -1) {
      // show item
      item.style.display = "block";
    } else {
      // hide item
      item.style.display = "none";
    }
  });
}

//Remove all tasks
function removeTasks(e) {
  console.log(taskList.children);
  if (!taskList.hasChildNodes()) {
    alert("No tasks");
  } else {
    if (confirm("Do you want to delete all tasks?")) {
      // Loop over the childElements and delete them
      var child = taskList.lastElementChild;
      while (child) {
        console.log("+");
        taskList.removeChild(child);
        child = taskList.lastElementChild;
      }

      // second option of delete - innerHTML
      taskList.innerHTML = "";
    }
    clearTasksFromLocalStorage();
  }
}

//Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (
      confirm(`Delete "${e.target.parentElement.parentElement.textContent}" ?`)
    ) {
      // remove li
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Task is empty ! try again");
  } else {
    // Create li element
    let li = document.createElement("li");
    li.className = "collection-item";
    li.style.borderSpacing = "500px";

    //Add nodeText
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    link = document.createElement("a");
    link.className = "delete-item secondary-content";

    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);

    console.log(li);
    // Add li to ul
    taskList.appendChild(li);

    //Store in local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = "";
  }

  e.preventDefault();
}

/////////////////////////////////////////////////////////////

function storeTaskInLocalStorage(task) {
  let tasks;
  // check if the tasks is empty or not
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // extract the tasks from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // push the new task to the list
  tasks.push(task);

  // Reset the new list in the LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show all tasks
function getTasks() {
  let tasks;
  // check if the tasks is empty or not
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // extract the tasks from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // add new task do display

    // Create li element
    let li = document.createElement("li");
    li.className = "collection-item";
    li.style.borderSpacing = "500px";

    //Add nodeText
    li.appendChild(document.createTextNode(task));

    // Create new link element
    link = document.createElement("a");
    link.className = "delete-item secondary-content";

    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);

    console.log(li);
    // Add li to ul
    taskList.appendChild(li);
  });
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // check if the tasks is empty or not
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // extract the tasks from LS
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  // Reset the new list in the LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
