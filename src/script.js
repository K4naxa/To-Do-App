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

  // Implement other functions for managing To-Do items
}
// Create new todo & Place it in memory
function toDo_factory() {}

// filter todo Renderin with Home / Today / Week

// Create Sort by function

// dom renderer

// memory looper

// filter selector

//card creator

// card editor

// ADD button function
const DOMrenderer = new DOMrender();
addToDo_Btn.onclick = DOMrenderer.renderAddToDo;
newtodo_closeWindowBtn.onclick = DOMrenderer.closeAddToDo;
