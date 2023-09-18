// modal for new todo window
const newToDoForm_modal = document.querySelector(".newToDoForm-modal");

// button to check todo as completed
const todoCheckBtn = document.querySelector(".CheckBtn");

// button to remove todo from the lists
const todoTrashBtn = document.querySelector(".TrashBtn");

// button to edit the todos info
const todoEditBtn = document.querySelector(".EditBtn");

// Button to open new todo window
const addToDo_Btn = document.getElementById("addToDoBtn");

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
  renderCard(card) {}

  renderAddToDo() {
    newToDoForm_modal.classList.add("visible");
  }
  closeAddToDo() {
    newToDoForm_modal.classList.remove("visible");
  }
}
//create domrenderer to use domrender functions
const DOMrenderer = new DOMrender();

class ToDoManager {
  constructor() {
    this.todos = []; // Store To-Do items in memory
  }

  addToDo(todo) {
    this.todos.push(todo);
  }

  checkForActivePriority() {
    const btns = document.querySelectorAll(".toDo_priorityBtns");
    for (const btn of btns) {
      const tmpPrio = btn.textContent.toLocaleLowerCase();
      if (btn.classList.contains(`toDo_${tmpPrio}PriorityBtn_active`)) {
        return tmpPrio;
      }
    }
  }

  // creates Todo from filled form window
  createTodo() {
    let title = form_toDo_title.value;
    let details = form_toDo_details.value;
    let date = form_toDo_date.value;
    let priority = this.checkForActivePriority();

    return { title, details, date, priority };
  }
}

// Creates the todomanager to use functions inside of ToDoManager class
const TodoManagerer = new ToDoManager();

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
  console.log(e.target.classList);
  e.target.classList.add(`toDo_${priority}PriorityBtn_active`);
}

function toDo_factory() {}

function filterSelector() {}
function memoryLooper() {}
function sortBy() {}

// Activates todo new Entry window when the + icon is clicked
addToDo_Btn.onclick = DOMrenderer.renderAddToDo;

// closes todo new entry window when x is clicked
newtodo_closeWindowBtn.onclick = DOMrenderer.closeAddToDo;

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

submitTodoform.addEventListener("click", () => {
  event.preventDefault();
  let newTodo = TodoManagerer.createTodo();
  console.log(newTodo);
});
