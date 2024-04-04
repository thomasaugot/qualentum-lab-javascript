document.addEventListener("DOMContentLoaded", function () {
  // estructura de datos para tareas
  function Task(name, id, completed) {
    this.name = name;
    this.id = id;
    this.completed = completed;
  }

  // estructura de datos para almanecimiento de tareas
  const tasks = [];

  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  // para crear nueva tarea
  function createTaskElement(task) {
    const li = document.createElement("li");
    li.dataset.taskId = task.id;

    const article = document.createElement("article");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.name;

    article.appendChild(checkbox);
    article.appendChild(span);
    li.appendChild(article);

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fa", "fa-trash");
    li.appendChild(deleteButton);

    // para borrar una tarea
    deleteButton.addEventListener("click", function () {
      const taskId = li.dataset.taskId;
      const index = tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
        li.remove();
      }
    });

    // para que el checkbox cambie el estado a completed
    checkbox.addEventListener("change", function () {
      const taskId = li.dataset.taskId;
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = checkbox.checked;
      }
    });

    return li;
  }

  // añadir nueva tarea
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const taskId = Date.now().toString(); // para generar id
      const task = new Task(taskText, taskId, false);
      tasks.push(task);
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
      taskInput.value = "";
    }
  }

  // event listener para añadir tarea
  addTaskButton.addEventListener("click", addTask);
});
