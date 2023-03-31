const todoForm = document.getElementById("todo-form");
const nothingDiv = document.getElementById("nothing");
const todoListContainer = document.getElementById("todo-list");

let todoList = [
  // {
  //   id: 1,
  //   todo: "Go fishing",
  //   done: false,
  // },
  // {
  //   id: 2,
  //   todo: "Go fishing",
  //   done: false,
  // },
  // {
  //   id: 3,
  //   todo: "Go back home",
  //   done: false,
  // },
];

let idCount = 0;

function updateTodo() {
  if (todoList.length > 0) {
    nothingDiv.style.display = "none";

    const todoItems = todoList.map(
      (todoItem) =>
        `<li class="todo-item" id="todo-${todoItem.id}">
            <input type="checkbox" class="checkbox" />
            <p class='todo-text ${todoItem.done ? "done" : ""}' >${
          todoItem.todo
        }</p>
            <button class="remove-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span class="sr-only">remove</span>
            </button>
          </li>`
    );

    todoListContainer.innerHTML = todoItems.join("");

    todoList.forEach((todoListItem) => {
      addEvents(todoListItem.id);
    });
  } else {
    todoListContainer.innerHTML = "";
    nothingDiv.style.display = "grid";
  }
}

// Updating the todolist
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the text submitted by the user
  let todoInput = e.target.elements.todo.value;
  idCount += 1;
  let newTodo = {
    id: idCount,
    todo: todoInput,
    done: false,
  };

  todoList.push(newTodo);
  updateTodo();
  e.target.elements.todo.value = "";
});

function addEvents(todoId) {
  // Get the todo element
  let todoElement = document.getElementById(`todo-${todoId}`);

  // Get the todo item
  let todoItem = todoList.find((tItem) => tItem.id === todoId);

  // Get the checkbox of the todo element
  let todoCheckBox = todoElement.querySelector("input");

  if (todoItem.done) {
    todoCheckBox.checked = true;
  }

  // Get the paragraph tag of the todo element
  let todoText = todoElement.querySelector("p");

  // Get the button tag of the todo element
  let todoButton = todoElement.querySelector("button");

  // When a todo is checked or unchecked
  todoCheckBox.addEventListener("change", () => {
    // Get the todoItem

    if (todoItem.done) {
      todoItem.done = false;
      todoText.classList.remove("done");
    } else {
      todoItem.done = true;
      todoText.classList.add("done");
    }
  });

  todoButton.addEventListener("click", () => {
    todoList = todoList.filter((tItem) => tItem.id !== todoId);
    updateTodo();
  });
}

// ---------------------- EXTRA --------------------------------------------------------------------
// DARK MODE

let darkModeButton = document.getElementById("dark-mode");
darkModeButton.addEventListener("click", () => {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
