// modal for new todo window
const newToDoForm_modal = document.querySelector(".newToDoForm-modal");

// Button to open todo creation window
const addToDo_Btn = document.getElementById("addToDoBtn");

const todoContainer = document.querySelector(".container");

// List buttons to select visible todos ( add " active " class for visial representation of active selector)
const todoAllProjectPage = document.querySelector(".todoAllProjectPage");
const todoDayProjectPage = document.querySelector(".todoDayProjectPage");
const todoWeekProjectPage = document.querySelector(".todoWeekProjectPage");

// ------------------------------------------------------------------------
// querySelectors from New Entry window ->

// form inputs
const form_toDo_title = document.getElementById("toDo_title");
const form_toDo_details = document.getElementById("toDo_details");
const form_toDo_date = document.getElementById("toDo_date");
const toDo_lowPriorityBtn = document.querySelector(".toDo_lowPriorityBtn");
const toDo_mediumPriorityBtn = document.querySelector(".toDo_mediumPriorityBtn");
const toDo_highPriorityBtn = document.querySelector(".toDo_highPriorityBtn");

// Button that submits the create todo form
const submitTodoform = document.querySelector(".createToDoBtn");

// Button to close the new todo window within the window
const newtodo_closeWindowBtn = document.getElementById("newtodo_closeWindowBtn");

// --------------------------------------------------------------------

// CLass that includes all DOM rendering functions
class DOMrender {
  renderTodo(todo) {
    // Creating elements for new Todo Card
    const toDoCard = document.createElement("div");
    const cardContent = document.createElement("div");
    const CheckBtn = document.createElement("button");
    const cardtitle = document.createElement("div");

    const cardControls = document.createElement("div");
    const detailsBtn = document.createElement("button");
    const cardDate = document.createElement("div");
    const EditBtn = document.createElement("button");
    const TrashBtn = document.createElement("button");

    // giving elements their css classes
    toDoCard.classList.add("toDoCard");
    cardContent.classList.add("cardContent");
    CheckBtn.classList.add("CheckBtn");
    cardtitle.classList.add("cardtitle");

    cardControls.classList.add("cardControls");
    detailsBtn.classList.add("detailsBtn");
    cardDate.classList.add("cardDate");
    EditBtn.classList.add("EditBtn");
    TrashBtn.classList.add("TrashBtn");

    // adding priority
    switch (todo.priority) {
      case "low":
        toDoCard.classList.add("priorityLow");
        break;

      case "medium":
        toDoCard.classList.add("priorityMedium");
        break;

      case "high":
        toDoCard.classList.add("priorityHigh");
        break;

      default:
        break;
    }

    // adding text content for elements
    cardtitle.textContent = todo.title;
    cardDate.textContent = todo.date;
    detailsBtn.textContent = "Details";

    // appending children for the elements

    todoContainer.appendChild(toDoCard);
    toDoCard.appendChild(cardContent);
    toDoCard.appendChild(cardControls);

    cardContent.appendChild(CheckBtn);
    cardContent.appendChild(cardtitle);

    cardControls.appendChild(detailsBtn);
    cardControls.appendChild(cardDate);
    cardControls.appendChild(EditBtn);
    cardControls.appendChild(TrashBtn);
  }

  renderAddToDoForm() {
    document.getElementById("createTodoForm").reset();
    newToDoForm_modal.classList.add("visible");
  }
  closeAddToDoForm() {
    newToDoForm_modal.classList.remove("visible");
  }
  renderAllTodos() {
    for (let i = 0; i < todoManagment.todos.length; i++) {
      this.renderTodo(todoManagment.todos[i]);
    }
  }
}
const DOMrenderer = new DOMrender();

class ToDoManager {
  constructor() {
    this.todos = []; // Store To-Do items in memory
  }

  addToDo(todo) {
    this.todos.push(todo); // pushes new todo to todo array
  }

  // checks for active priority inside of new todo form
  checkForActivePriority() {
    const btns = document.querySelectorAll(".toDo_priorityBtns");
    for (const btn of btns) {
      const tmpPrio = btn.textContent.toLocaleLowerCase();
      if (btn.classList.contains(`toDo_${tmpPrio}PriorityBtn_active`)) {
        return tmpPrio;
      }
    }
  }

  // creates Todo from new todo form window
  createTodo() {
    let title = form_toDo_title.value;
    let details = form_toDo_details.value;
    let date = form_toDo_date.value;
    let priority = this.checkForActivePriority();
    let filter;

    return { title, details, date, priority, filter };
  }
}
const todoManagment = new ToDoManager();

// Disables all active Priority tags
function removeActivePriority() {
  const btns = document.querySelectorAll(".toDo_priorityBtns");
  btns.forEach((btn) => {
    const priority = btn.textContent.toLocaleLowerCase();

    btn.classList.remove(`toDo_${priority}PriorityBtn_active`);
  });
}

// Activates priority button that was clicked
function activatePriority(e) {
  event.preventDefault();
  removeActivePriority();
  const priority = e.target.textContent.toLowerCase();
  e.target.classList.add(`toDo_${priority}PriorityBtn_active`);
}

function memoryLooper() {}
function sortBy() {}

// function for todo Form Submit button
function submitTodoformFunction() {
  event.preventDefault();
  let newTodo = todoManagment.createTodo();
  todoManagment.addToDo(newTodo);
  DOMrenderer.renderAllTodos();

  DOMrenderer.closeAddToDoForm();
}

// Activates todo new Entry window when the + icon is clicked
addToDo_Btn.onclick = DOMrenderer.renderAddToDoForm;

// closes todo new entry window when x is clicked
newtodo_closeWindowBtn.onclick = DOMrenderer.closeAddToDoForm;

// Checks for clicked Priority selection in Todo creation form and activates it
toDo_lowPriorityBtn.addEventListener("click", (e) => {
  activatePriority(e);
});
toDo_mediumPriorityBtn.addEventListener("click", (e) => {
  activatePriority(e);
});
toDo_highPriorityBtn.addEventListener("click", (e) => {
  activatePriority(e);
});

submitTodoform.onclick = submitTodoformFunction;
