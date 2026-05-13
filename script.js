let tasks = []

let emptyMessage = document.querySelector("#emptyMessage")
let taskForm = document.querySelector("#taskForm")
let taskInput = document.querySelector("#taskInput")
let taskList = document.querySelector("#taskList")

let renderTasks = () => {
    taskList.innerHTML="";
    if(tasks.length>0)
        emptyMessage.classList.add("hidden")
    else
        emptyMessage.classList.remove("hidden")
    tasks.forEach((task)=>{
        let li = document.createElement("li");
        li.innerHTML = `<div class="grid gap-2 flex-1 min-w-0">
                    <div class="flex gap-2 min-w-0">
                        <input class="h-4 w-4 mt-1 cursor-pointer accent-black task-checkbox" type="checkbox">
                        <p class="font-semibold text-gray-900 flex-1 min-w-0 break-all  task-title">${task.title}</p>
                    </div>
                    <p class="flex-1 text-sm text-gray-500 task-date">Created: ${task.createdAt}</p>
                </div>
                <div class="grid gap-1">
                    <button class="edit-btn text-sm px-2 py-1 rounded hover:bg-gray-100 hover:cursor-pointer"
                        type="button">Edit</button>
                    <button class="delete-btn text-sm px-2 py-1 rounded hover:bg-gray-100 hover:cursor-pointer"
                        type="button">Delete</button>
                </div>`;
        li.className = "task-card overflow-hidden flex flex-col sm:flex-row gap-3 sm:items-start sm:justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        taskList.appendChild(li);
    })
}


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
    taskInput.value="";
    tasks.push(task);
    renderTasks();
})

renderTasks();