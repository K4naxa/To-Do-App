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
const toDo_mediumPriorityBtn = document.querySelector(
  ".toDo_mediumPriorityBtn"
);
const toDo_highPriorityBtn = document.querySelector(".toDo_highPriorityBtn");

// Button that submits the create todo form
const submitTodoform = document.querySelector(".createToDoBtn");

// Button to close the new todo window within the window
const newtodo_closeWindowBtn = document.getElementById(
  "newtodo_closeWindowBtn"
);

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

  createToDo(title, details, date, priority, project) {
    return { title, details, date, priority, project };
  }

  getNewTodo() {
    let title = form_toDo_title.value;
    let details = form_toDo_details.value;
    let date = form_toDo_date.value;
  }
}

function removeActivePriority() {
  const btns = document.querySelectorAll(".toDo_priorityBtns");
  btns.forEach((btn) => {
    btn.classList.remove(`toDo_${priority}PriorityBtn_active`);
  });
}

function activatePriority(e) {
  event.preventDefault();
  removeActivePriority();

  const priority = e.target.textContent.toLowerCase();
  e.target.classList.add(`toDo_${priority}PriorityBtn_active`);
}

function toDo_factory() {}

function filterSelector() {}
function memoryLooper() {}
function sortBy() {}

addToDo_Btn.onclick = DOMrenderer.renderAddToDo;
newtodo_closeWindowBtn.onclick = DOMrenderer.closeAddToDo;

toDo_lowPriorityBtn.addEventListener("click", (e) => {
  activatePriority(e);
});
toDo_mediumPriorityBtn.addEventListener("click", (e) => {
  activatePriority(e);
});
toDo_highPriorityBtn.addEventListener("click", (e) => {
  activatePriority(e);
});
