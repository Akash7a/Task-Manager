const body = document.body;
const form = document.querySelector("form");
const input = document.querySelector("form input");
const showPointsElem = document.createElement("p");
const storeContainer = document.querySelector(".store_container");
const totalCompletedTasks = document.createElement("p");
let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
let completedTaskArray = localStorage.getItem("onlyCompletedTasks") ? JSON.parse(localStorage.getItem("onlyCompletedTasks")) : [];

// Function to create and display tasks
const createTask = () => {
    const existingTasks = document.querySelectorAll(".task_container");
    existingTasks.forEach(task => task.remove());

    tasks.forEach((task, i) => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task_container");
         
        if(task.removed){
            taskContainer.classList.add("remove");
        }
        const controls = document.createElement("div");
        controls.classList.add("controls");

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("bi", "bi-trash-fill");
        deleteBtn.addEventListener("click", () => removeTask(i));

        const checkBtn = document.createElement("i");
        checkBtn.classList.add("bi", task.completed ? "bi-check-circle" : "bi-circle");
        checkBtn.addEventListener("click", () => markAsCompleted(i));

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = task.title;
        if (task.completed) {
            title.classList.add("completed");
        }

        taskContainer.appendChild(title);
        controls.appendChild(deleteBtn);
        controls.appendChild(checkBtn);
        taskContainer.appendChild(controls);
        body.appendChild(taskContainer);
    });

    givePoints();
};

// Function to update the displayed points
const givePoints = () => {
    showPointsElem.classList.add("points");
    showPointsElem.textContent = `See Completed task`;
    body.append(showPointsElem);
};

// Function to remove a task
const removeTask = (index) => {
    tasks[index].removed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask();
};

// Function to mark a task as completed
const markAsCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask();
    storeCompletedTasks();
    showCompletedTasks();
};

// Function to store completed tasks
const storeCompletedTasks = () => {
    completedTaskArray = tasks.filter(task => task.completed);
    localStorage.setItem("onlyCompletedTasks", JSON.stringify(completedTaskArray));
};

// Function to display completed tasks
const showCompletedTasks = () => {
    storeContainer.innerHTML = '';

    const length = completedTaskArray.length;
    totalCompletedTasks.classList.add('total_completed_tasks');
    totalCompletedTasks.textContent = `Congrats! You've done ${length} tasks.`;
    storeContainer.appendChild(totalCompletedTasks);

    completedTaskArray.forEach((task, i) => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("completed_task_container");

        const title = document.createElement("p");
        title.textContent = task.title;
        title.classList.add("completed_tasks");

        taskContainer.appendChild(title);
        storeContainer.appendChild(taskContainer);
    });
};

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value.trim() === ""){
        return;
    }
    tasks.push({ title: input.value.trim(), completed: false, removed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask();
    input.value = "";
    storeCompletedTasks();
    showCompletedTasks();
});

createTask();
storeCompletedTasks();
showCompletedTasks();
showPointsElem.addEventListener("click", () => {
    storeContainer.classList.toggle("show_hide");
});