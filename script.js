document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('tasks');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    function addTask(taskText = null, save = true) {
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const button = document.createElement('button');
            button.textContent = 'Remove';
            button.className = 'remove-btn';
            button.addEventListener('click', () => {
                taskList.removeChild(listItem);
                // Remove from localStorage
                const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                const index = storedTasks.indexOf(taskText);
                if (index > -1) {
                    storedTasks.splice(index, 1);
                    localStorage.setItem("tasks", JSON.stringify(storedTasks));
                }
            });

            listItem.appendChild(button);
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});