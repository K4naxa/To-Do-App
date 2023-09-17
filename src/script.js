const newToDoForm_modal = document.querySelector(".newToDoForm-modal");

const addToDo_Btn = document.getElementById("addToDoBtn");
const newtodo_closeWindowBtn = document.getElementById(
  "newtodo_closeWindowBtn"
);

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

class ToDoManager {
  constructor() {
    this.todos = []; // Store To-Do items in memory
  }

  addToDo(todo) {
    this.todos.push(todo);
  }

  cardCreator() {}
  cardEditor() {}
}

function toDo_factory() {}

function filterSelector() {}
function memoryLooper() {}
function sortBy() {}

// ADD button function
const DOMrenderer = new DOMrender();
addToDo_Btn.onclick = DOMrenderer.renderAddToDo;
newtodo_closeWindowBtn.onclick = DOMrenderer.closeAddToDo;
