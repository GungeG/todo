// Hent opgaver fra localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Gem opgaver i localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tilføj en ny opgave
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const description = taskInput.value.trim();
    
    if (description === "") {
        alert("Please write a task!");
        return;
    }

    const tasks = getTasksFromLocalStorage();
    
    // Opret en ny opgave med et unikt ID og en beskrivelse
    const newTask = {
        id: Date.now(),
        description: description,
        completed: false,
        quantity: 1
    };

    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);
    taskInput.value = ""; // Tøm input-feltet
    renderTasks();
}

// Markér en opgave som færdig eller fortryd færdiggørelsen
function toggleTaskCompletion(taskId) {
    const tasks = getTasksFromLocalStorage();
    
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed; // Skift status
        saveTasksToLocalStorage(tasks);
        renderTasks();  
    }
}

// Slet en opgave
function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

// Ændr kvantiteten for en opgave
function changeQuantity(taskId, newQuantity) {
    const tasks = getTasksFromLocalStorage();
    
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const quantity = parseInt(newQuantity);
        if (!isNaN(quantity) && quantity > 0) {
            task.quantity = quantity;
            saveTasksToLocalStorage(tasks);
            renderTasks();
        } else {
            alert("No decimals!");
        }
    }
}

// Vis opgaver i UI
function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    
    const todoTasks = document.getElementById("todoTasks");
    const doneTasks = document.getElementById("doneTasks");

    todoTasks.innerHTML = "";
    doneTasks.innerHTML = "";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) taskElement.classList.add("complete");

        taskElement.innerHTML = `
            <span>
                ${task.description} 
                (Antal: 
                <input type="number" min="1" class="quantity-input" value="${task.quantity}" 
                       onchange="changeQuantity(${task.id}, this.value)">
                )
            </span>
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">
                    ${task.completed ? "Fortryd" : "Færdig"}
                </button>
                <button onclick="deleteTask(${task.id})">Slet</button>
            </div>
        `;

        if (task.completed) {
            doneTasks.appendChild(taskElement);
        } else {
            todoTasks.appendChild(taskElement);
        }
    });
}

// Indlæs opgaver ved siden indlæses
window.onload = function () {
    renderTasks();
};
