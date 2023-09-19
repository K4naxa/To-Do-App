// modal for new todo window
const newToDoForm_modal = document.querySelector(".newToDoForm-modal");

// Button to open todo creation window
const addToDo_Btn = document.getElementById("addToDoBtn");

// container for todos
const todoContainer = document.querySelector(".container");

// main page project container
const mainWindow_ProjectsContainer = document.querySelector(".mainWindow_ProjectsContainer");

// button to create new project
const CreateNewProjectBtn = document.querySelector(".CreateNewProjectBtn");
// text area in witch you name the new project
const CreateNewProjectTextField = document.getElementById("CreateNewProjectTextArea");

// List buttons to select visible todos ( add " active " class for visial representation of active selector)
const todoAllProjectPage = document.querySelector(".todoAllProjectPage");
const todoDayProjectPage = document.querySelector(".todoDayProjectPage");
const todoWeekProjectPage = document.querySelector(".todoWeekProjectPage");

// ------------------------------------------------------------------------
// querySelectors from New Entry window ->

const newTodoWindow_projectsContainer = document.querySelector(".FormProjectMenu");
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

//
//
//
//
//

class MemoryManagment {
  saveTodoList() {
    let todosString = JSON.stringify(todoManager.todos);
    localStorage.setItem("todos", todosString);
  }

  saveProjectsList() {
    let projectsString = JSON.stringify(projectManager.projects);
    localStorage.setItem("projects", projectsString);
  }

  getTodoList() {
    let todosString = localStorage.getItem("todos");
    return JSON.parse(todosString);
  }

  getProjectsList() {
    let projectsString = localStorage.getItem("projects");
    return JSON.parse(projectsString);
  }
}
const memoryManager = new MemoryManagment();

//
//
//

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

    if (todo.state) {
      toDoCard.classList.add("toDoCompleted");
    }

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

    // button functions
    CheckBtn.addEventListener("click", (e) => {
      todoManager.toggleTodoState(e);
    });

    TrashBtn.addEventListener("click", (e) => {
      todoManager.deleteTodo(e);
    });
  }

  renderAddToDoForm() {
    document.getElementById("createTodoForm").reset(); // resets the form
    DOMrenderer.renderProjects_newTodoWindow(); // Renders interactable project list to Addtodo form window
    newToDoForm_modal.classList.add("visible"); // makes the window visible
  }
  closeAddToDoForm() {
    newToDoForm_modal.classList.remove("visible");
  }
  renderAllTodos() {
    todoContainer.innerHTML = "";
    for (let i = 0; i < todoManager.todos.length; i++) {
      this.renderTodo(todoManager.todos[i]);
    }
  }

  ToggleNewProjectTextArea() {
    if (CreateNewProjectBtn.classList.contains("visible")) {
      CreateNewProjectBtn.classList.remove("visible");
      CreateNewProjectTextField.classList.add("visible");
      CreateNewProjectTextField.focus();
    } else {
      CreateNewProjectBtn.classList.add("visible");
      CreateNewProjectTextField.classList.remove("visible");
      CreateNewProjectTextField.value = "";
    }
  }

  renderProjects_mainPageContainer() {
    mainWindow_ProjectsContainer.innerHTML = "";
    const uList = document.createElement("ul");
    mainWindow_ProjectsContainer.appendChild(uList);

    for (let i = 0, len = projectManager.projects.length; i < len; i++) {
      const newListItem = document.createElement("li");

      newListItem.innerText = projectManager.projects[i];
      newListItem.classList.add("filter");

      uList.appendChild(newListItem);
    }
  }

  renderProjects_newTodoWindow() {
    newTodoWindow_projectsContainer.innerHTML = "";
    const ulList = document.createElement("ul");
    newTodoWindow_projectsContainer.appendChild(ulList);

    for (let i = 0, len = projectManager.projects.length; i < len; i++) {
      const newListItem = document.createElement("li");

      newListItem.innerText = projectManager.projects[i];
      newListItem.classList.add("filter");

      ulList.appendChild(newListItem);
    }
  }
}
const DOMrenderer = new DOMrender();

//
//
//

class ToDoManagment {
  constructor() {
    this.todos = []; // Store To-Do items in memory
    this.todos = memoryManager.getTodoList();
  }
  todos = memoryManager.getTodoList();

  addToDo(todo) {
    this.todos.push(todo); // pushes new todo to todo array
    memoryManager.saveTodoList();
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
    let state = false;
    let filter;

    return { title, details, date, priority, state, filter };
  }

  findTodoIndex(e) {
    const targetTodoCard = e.target.closest(".toDoCard"); // scope the todocard to look for its title
    const cardTitle = targetTodoCard.querySelector(".cardtitle").textContent; // get the title from the card
    for (let i = 0, len = todoManager.todos.length; i < len; i++) {
      // loop through todos to find the index for the specific todo
      if (todoManager.todos[i].title === cardTitle) {
        return i;
      }
    }
  }

  toggleTodoState(e) {
    const index = this.findTodoIndex(e);
    const todoElement = todoManager.todos[index];

    if (todoElement.state === false) {
      todoElement.state = true;
    } else {
      todoElement.state = false;
    }

    DOMrenderer.renderAllTodos();
    return;
  }

  deleteTodo(e) {
    const index = this.findTodoIndex(e);
    todoManager.todos.splice(index, 1);

    memoryManager.saveTodoList();
    DOMrenderer.renderAllTodos();
  }
}
const todoManager = new ToDoManagment();

//
//
//

// projectmanagment to include all project manipulation
class ProjectManagment {
  constructor() {
    this.projects = [];
    this.projects = memoryManager.getProjectsList();
  }

  createNewProject(newProject) {
    this.projects.push(newProject);
    memoryManager.saveProjectsList();
    DOMrenderer.renderProjects_mainPageContainer();
  }
}
const projectManager = new ProjectManagment();

//
//
//
//
//

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

// function for todo Form Submit button
function submitTodoformFunction() {
  event.preventDefault();
  let newTodo = todoManager.createTodo();
  todoManager.addToDo(newTodo);
  DOMrenderer.renderAllTodos();

  DOMrenderer.closeAddToDoForm();
}

//
//
//
//
//

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
CreateNewProjectBtn.onclick = DOMrenderer.ToggleNewProjectTextArea;
CreateNewProjectTextField.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    projectManager.createNewProject(e.target.value);
    DOMrenderer.ToggleNewProjectTextArea();
  }
});

// start the page with the pages loaded
DOMrenderer.renderAllTodos();
DOMrenderer.renderProjects_mainPageContainer();
