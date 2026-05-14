let tasks = [];
let emptyMessage = document.querySelector("#emptyMessage")
let taskForm = document.querySelector("#taskForm")
let taskInput = document.querySelector("#taskInput")
let taskList = document.querySelector("#taskList")
let totalCountState = document.querySelector("#totalCount")
let activeCountState = document.querySelector("#activeCount")
let completedCountState = document.querySelector("#completedCount")
let allFilterBtn = document.querySelector("#allFilterBtn")
let activeFilterBtn = document.querySelector("#activeFilterBtn")
let completedFilterBtn = document.querySelector("#completedFilterBtn")
let searchInput = document.querySelector("#searchInput")
let clearCompletedTask = document.querySelector("#clearCompletedTaskBtn")
let currentFilter = "all"
let searchText = ""
let editingTaskId = null
let editedTaskTitle = ""

let loadTasks = () => {
    tasks = JSON.parse(localStorage.getItem("advancedTodoTasks")) || []
}

let saveTasks = () => {
    localStorage.setItem("advancedTodoTasks", JSON.stringify(tasks));
}

let updateStats = () => {
    let all = tasks.length;
    let completed = 0;
    tasks.forEach((task) => {
        if (task.completed)
            completed++;
    })
    let active = all - completed;
    totalCountState.textContent = all;
    activeCountState.textContent = active;
    completedCountState.textContent = completed;
    if(completed===0)
        clearCompletedTask.classList.add("hidden")
    else
        clearCompletedTask.classList.remove("hidden")

}

let clearCompletedTasks = () =>{
    clearCompletedTask.addEventListener("click",()=>{
        tasks=tasks.filter((task)=>{
            return !task.completed
        })
        saveTasks();
        renderTasks();
    })
}

let deleteTask = () => {
    let deleteBtn = document.querySelectorAll(".delete-btn")
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            let id = Number(btn.closest("li").id);
            tasks = tasks.filter((task) => {
                return task.id !== id;
            })
            saveTasks();
            renderTasks();
        })
    })
}

let toggleComplete = () => {
    let taskCheckbox = document.querySelectorAll(".task-checkbox");
    taskCheckbox.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            let id = Number(checkbox.closest("li").id)
            tasks.forEach((task) => {
                if (task.id === id)
                    task.completed = !task.completed;
            })
            saveTasks();
            renderTasks()
        })
    })
}

let updateFilterBtn = (currentFilter) => {
    if (currentFilter === "all") {
        allFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-black text-white  hover:cursor-pointer"
        activeFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer"
        completedFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer"
    }
    else if (currentFilter === "active") {
        activeFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-black text-white hover:cursor-pointer"
        allFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer"
        completedFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer"
    }
    else {
        completedFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-black text-white hover:cursor-pointer"
        allFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer"
        activeFilterBtn.className = "text-lg font-semibold border px-6 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer"
    }
}


let searchTask = () => {
    searchInput.addEventListener("input", () => {
        searchText = searchInput.value.trim();
        renderTasks()
    })

}

let startEditTask = () => {
    let editBtn = document.querySelectorAll(".edit-btn")
    editBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            editingTaskId = Number(btn.closest("li").id)
            renderTasks();
        })
    })

}

let cancelEditTask = () => {
    let cancelEditBtn = document.querySelector(".cancel-edit-btn")
    if (!cancelEditBtn) return;
    cancelEditBtn.addEventListener("click", () => {
        editingTaskId = null;
        renderTasks();
    })
}

let saveEditTask = () => {
    let saveEditBtn = document.querySelector(".save-edit-btn")
    let editInput = document.querySelector(".edit-input")
    if (!saveEditBtn || !editInput) return;
    saveEditBtn.addEventListener("click", () => {
        editedTaskTitle = editInput.value.trim();
        if (editedTaskTitle === "") return;
        let id = Number(editInput.closest("li").id);
        tasks.forEach((task) => {
            if (task.id === id)
                task.title = editedTaskTitle;
        })
        editingTaskId = null;
        saveTasks();
        renderTasks();
    })
}

let renderTasks = () => {
    taskList.innerHTML = "";
    updateStats();
    let filteredTasks = [];
    if (currentFilter === "all")
        filteredTasks = tasks;
    else if (currentFilter === "active") {
        filteredTasks = tasks.filter((task) => {
            return task.completed === false;
        })
    }
    else {
        filteredTasks = tasks.filter((task) => {
            return task.completed === true;
        })
    }
    if (searchText != "") {
        filteredTasks = filteredTasks.filter((task) => {
            return task.title.toLowerCase().includes(searchText.toLowerCase());
        })
    }
    if (tasks.length > 0) {
        if (filteredTasks.length > 0)
            emptyMessage.classList.add("hidden")
        else {
            emptyMessage.textContent = "No matching tasks found"
            emptyMessage.classList.remove("hidden")
        }
    }
    else {
        emptyMessage.textContent = "No tasks yet. Add your first task above"
        emptyMessage.classList.remove("hidden")
    }
    filteredTasks.forEach((task) => {
        let li = document.createElement("li");
        if (task.id === editingTaskId) {
            li.innerHTML = `<div class="grid gap-3 flex-1 min-w-0">
                             <input class="edit-input border border-gray-400 rounded outline-none px-4 py-2 w-full focus:border-black focus:ring-2" type="text" value="${task.title}">
                             <p class="text-sm text-gray-500 task-date">Created: ${task.createdAt}</p>
                            </div>
                            <div class="flex sm:grid gap-2">
                             <button class="save-edit-btn text-sm px-3 py-1 rounded bg-black text-white hover:bg-gray-800 hover:cursor-pointer" type="button"> Save</button>
                             <button class="cancel-edit-btn text-sm px-3 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer" type="button"> Cancel</button>
                            </div>`;
        }
        else {
            li.innerHTML = `<div class="grid gap-2 flex-1 min-w-0">
                    <div class="flex gap-2 min-w-0">
                        <input class="h-4 w-4 mt-1 cursor-pointer accent-black task-checkbox" type="checkbox" ${task.completed ? "checked" : ""}>
                        <p class="font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900"} flex-1 min-w-0 break-all  task-title">${task.title}</p>
                    </div>
                    <p class="flex-1 text-sm text-gray-500 task-date">Created: ${task.createdAt}</p>
                </div>
                <div class="grid gap-1">
                    <button class="edit-btn text-sm px-2 py-1 rounded hover:bg-gray-100 hover:cursor-pointer"
                        type="button">Edit</button>
                    <button class="delete-btn text-sm px-2 py-1 rounded hover:bg-gray-100 hover:cursor-pointer"
                        type="button">Delete</button>
                </div>`;
        }
        li.className = `task-card overflow-hidden flex flex-col sm:flex-row gap-3 sm:items-start sm:justify-between ${task.completed ? "bg-gray-50 opacity-70" : "bg-white"} border border-gray-200 rounded-lg p-4 shadow-sm`
        li.id = task.id;
        taskList.appendChild(li);
    })
    deleteTask();
    toggleComplete();
    startEditTask();
    cancelEditTask();
    saveEditTask();
}



allFilterBtn.addEventListener("click", () => {
    currentFilter = "all"
    updateFilterBtn(currentFilter)
    renderTasks();
})

activeFilterBtn.addEventListener("click", () => {
    currentFilter = "active";
    updateFilterBtn(currentFilter)
    renderTasks();
})

completedFilterBtn.addEventListener("click", () => {
    currentFilter = "completed"
    updateFilterBtn(currentFilter)
    renderTasks();
})


let addTask = () => {
    taskForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let title = taskInput.value;
        title = title.trim();
        if (title === "") return;
        const task = {
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date().toLocaleDateString()
        }
        taskInput.value = "";
        tasks.push(task);
        saveTasks();
        renderTasks();
    })
}

loadTasks();
addTask();
clearCompletedTasks();
searchTask();
renderTasks();