//Document Object Model (DOM)
const inputField = document.getElementById("input-field");
const taskList = document.getElementById("task-list");
const deleteAllButton = document.getElementById("delete-all-button");

//Adds new tasks to the list upon input
function addtask() {
    if (inputField.value === "") {
        alert("Please type a task before hitting 'Add'");
    } else {
        let li = document.createElement("li");
        li.style.fontFamily = "'Montserrat', sans-serif";
        li.style.fontSize = "16px";
        li.innerHTML = inputField.value;
        taskList.appendChild(li);
        inputField.value = "";

        addDeleteIcon(li);

        addPriorityIcon(li, "images/high.png", "high-priority", "high-priority", "high-priority-span")
        addPriorityIcon(li, "images/medium.png", "medium-priority", "medium-priority")
        addPriorityIcon(li, "images/low.png", "low-priority", "low-priority")

        saveData();
    }
}

//Selects priority or deletes task
taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("high-priority")) {
        removeSelectedClass(e);
        e.target.classList.toggle("selected");
        saveData();
    } else if (e.target.classList.contains("medium-priority")) {
        removeSelectedClass(e);
        e.target.classList.toggle("selected");
        saveData();
    } else if (e.target.classList.contains("low-priority")) {
        removeSelectedClass(e);
        e.target.classList.toggle("selected");
        saveData();
    }


}, false);

//Clears the whole list
deleteAllButton.addEventListener("click", function (e) {
    taskList.innerHTML = "";
    saveData();
})

//Ensures the list does not blank upon browser refresh
function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showData() {
    taskList.innerHTML = localStorage.getItem("data");
}

function addPriorityIcon(taskItem, iconSrc, iconAlt, className, classNameSpan) {
    const iconSpan = document.createElement('span');
    iconSpan.classList.add(classNameSpan);

    const iconImg = document.createElement('img');
    iconImg.src = iconSrc;
    iconImg.alt = iconAlt;
    iconImg.classList.add(className);
    iconImg.width = 60;
    iconImg.height = 60;

    iconSpan.appendChild(iconImg);
    taskItem.appendChild(iconSpan);
}

function addDeleteIcon(task){
    let span = document.createElement("span");
    span.classList.add("delete_button");
    span.innerHTML = "\u00d7";
    task.appendChild(span);

}

function removeSelectedClass(event) {
    // Select all elements with the "selected" class
    let selectedElements = event.target.parentElement.parentElement.querySelectorAll(".selected");

    // Loop through the selected elements and remove the "selected" class
    selectedElements.forEach(function (element) {
        element.classList.remove("selected");
    });
}

showData();