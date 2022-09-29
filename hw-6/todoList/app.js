const TodoListTasks = [];

var todoListAddBtn = document.querySelector("#todo-list-task-add-btn");
todoListAddBtn.addEventListener("click", AddTodo);
const todoListElement = document.getElementById("todo-list");

function AddTodo() {
  var todoListTaskText = document.getElementById("todo-list-task-text").value;

  // var liElement = document.createElement("li");
  // liElement.innerText = todoListTaskText;
  // todoListElement.appendChild(liElement);

  AddTodoToViewModel(todoListTaskText);
  RenderViewModel();
}

function AddTodoToViewModel(text) {
  if (text.trim() === "") {
    return false;
  } else {
    var newTodo = {
      id: TodoListTasks.length + 1,
      text: text,
      isCompleted: false,
    };
    TodoListTasks.push(newTodo);
  }
}

function ToggleTodo(taskId) {
  var selectedTask = TodoListTasks.find((task) => task.id === taskId);
  var indexOfSelectedTask = TodoListTasks.indexOf(selectedTask);
  TodoListTasks[indexOfSelectedTask].isCompleted =
    !TodoListTasks[indexOfSelectedTask].isCompleted;
  RenderViewModel();
}

function RemoveTodo(taskId) {
  var selectedTask = TodoListTasks.find((task) => task.id === taskId);
  var indexOfSelectedTask = TodoListTasks.indexOf(selectedTask);
  TodoListTasks.splice(indexOfSelectedTask, 1);
  //удаляем элемент вручную через DOM
  document
    .getElementById("todolist-checkbox-" + taskId)
    .parentElement.parentElement.remove();
  //RenderViewModel();
}

const deleteButton = document.querySelector("#todo-list-task-delete-btn");
function DeleteAllTodos() {
  TodoListTasks.length = 0;
  RenderViewModel();
}
deleteButton.addEventListener("click", () => DeleteAllTodos());

//MVVM - Model View ViewModel

function CreateTodoListTaskComponent(task) {
  var liElement = document.createElement("li");
  liElement.classList.add("todolist-todo");
  if (task.isCompleted) liElement.classList.add("completed");

  var spanElement = document.createElement("span");

  var inputCheckboxElement = document.createElement("input");
  inputCheckboxElement.id = "todolist-checkbox-" + task.id;

  return `
    <li class="todolist-todo ${task.isCompleted ? "completed" : ""}">
        <span>
            <input type="checkbox" id="todolist-checkbox-${
              task.id
            }" onchange="ToggleTodo(${task.id})" ${
    task.isCompleted ? "checked" : ""
  }>
            <label for="todolist-checkbox-${task.id}">${task.text}</label>
        </span>
        <button class="todolist-remove-todo" onclick="RemoveTodo(${
          task.id
        })">×</button>
    </li>`;
}

function RenderViewModel(filterValue) {
  var filteredTasks = [...TodoListTasks];
  switch (Number(filterValue)) {
    case 1: //Completed
      filteredTasks = TodoListTasks.filter((task) => task.isCompleted);
      break;

    case 2: //Uncompleted
      filteredTasks = TodoListTasks.filter(
        (task) => task.isCompleted === false
      );
      break;
  }

  var todoListRenderInfo = "";
  for (const task of filteredTasks) {
    todoListRenderInfo = todoListRenderInfo.concat(
      CreateTodoListTaskComponent(task)
    );
  }

  todoListElement.innerHTML = todoListRenderInfo;
}

function FilterTodos(event) {
  RenderViewModel(event.target.value);
}
const todoListTaskFilter = document.querySelector("#todo-list-task-filter");
todoListTaskFilter.addEventListener("change", FilterTodos);
