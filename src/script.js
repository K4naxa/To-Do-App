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

// memory managment of the projets and todos with local memory
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

  renderTodoWithFilter(filteredTodos) {
    todoContainer.innerHTML = "";

    for (let i = 0, len = filteredTodos.length; i < len; i++) {
      this.renderTodo(filteredTodos[i]);
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

  renderActiveProject_MainWindow(projectText) {}

  renderProjects_mainPageContainer() {
    mainWindow_ProjectsContainer.innerHTML = "";
    const uList = document.createElement("ul");
    mainWindow_ProjectsContainer.appendChild(uList);

    for (let i = 0, len = projectManager.projects.length; i < len; i++) {
      const newListItem = document.createElement("li");

      newListItem.innerText = projectManager.projects[i];
      newListItem.classList.add("project");

      uList.appendChild(newListItem);

      // Add click event listener to activate the project filter
      newListItem.addEventListener("click", function (e) {
        const projectText = e.target.innerText;
        projectManager.activateProjectFilter(projectText);
      });

      const deleteProjectBtn = document.createElement("button");
      deleteProjectBtn.classList.add("deleteProjectBtn");
      newListItem.appendChild(deleteProjectBtn);

      deleteProjectBtn.addEventListener("click", function () {
        projectManager.deleteProject(i);
      });
    }
  }

  activateProject_newTodoWindow(event) {
    const list = event.target.closest("ul");

    // Remove "activeProject" class from all <li> elements within the <ul>
    list.querySelectorAll("li").forEach((li) => {
      li.classList.remove("activeProject");
    });

    // Add "activeProject" class to the clicked element (e.target)
    event.target.classList.add("activeProject");
  }

  renderProjects_newTodoWindow() {
    newTodoWindow_projectsContainer.innerHTML = "";
    const ulList = document.createElement("ul");
    newTodoWindow_projectsContainer.appendChild(ulList);

    for (let i = 0, len = projectManager.projects.length; i < len; i++) {
      const newListItem = document.createElement("li");

      newListItem.innerText = projectManager.projects[i];
      newListItem.classList.add("project");

      ulList.appendChild(newListItem);

      // add active state for clicked element
      newListItem.addEventListener("click", function (e) {
        DOMrenderer.activateProject_newTodoWindow(e);
      });
    }
  }
}
const DOMrenderer = new DOMrender();

//
//
//

class ToDoManagment {
  constructor() {
    this.todos = memoryManager.getTodoList();
  }
  todos = memoryManager.getTodoList();

  addToDo(todo) {
    if (this.todos === null || this.todos === undefined) {
      this.todos = []; // Initialize todos if it's null or undefined
    }
    this.todos.push(todo); // Push the new todo
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

  checkForActiveProject() {
    let activeProject = null; // Initialize a variable to store the active project
    newTodoWindow_projectsContainer.querySelectorAll("li").forEach((li) => {
      if (li.classList.contains("activeProject")) {
        activeProject = li.innerText; // Set the active project
      }
    });
    return activeProject; // Return the active project after the loop
  }

  // creates Todo from new todo form window
  createTodo() {
    let title = form_toDo_title.value;
    let details = form_toDo_details.value;
    let date = form_toDo_date.value;
    let priority = this.checkForActivePriority();
    let state = false;
    let project = this.checkForActiveProject();

    return { title, details, date, priority, state, project };
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

    memoryManager.saveTodoList();
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
    this.projects = memoryManager.getProjectsList();
  }

  createNewProject(newProject) {
    if (this.projects === null || this.projects === undefined) {
      this.projects = [];
    }

    this.projects.push(newProject);
    memoryManager.saveProjectsList();
    DOMrenderer.renderProjects_mainPageContainer();
  }

  // findProjectIndex(e) {
  //   const targetProject = e.target.closest(".project");
  //   const project = targetProject.innerText;
  //   for (let i = 0, len = projectManager.projects.length; i < len; i++) {
  //     if (projectManager.projects[i] === project) {
  //       return i;
  //     }
  //   }
  // }

  deleteProject(index) {
    this.projects.splice(index, 1);
    DOMrenderer.renderProjects_mainPageContainer();
    memoryManager.saveProjectsList();
  }

  activateProjectFilter(filter) {
    // Filter the todos array based on the project property
    const filteredTodos = todoManager.todos.filter((todo) => todo.project === filter);

    // Pass the filtered array to renderTodoWithFilter
    DOMrenderer.renderTodoWithFilter(filteredTodos);
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

// BUTTON LISTENERS //

// Activates todo new Entry window when the + icon is clicked
addToDo_Btn.onclick = DOMrenderer.renderAddToDoForm;

// closes todo new entry window when x is clicked
newtodo_closeWindowBtn.onclick = DOMrenderer.closeAddToDoForm;

// creates a new todo from the info of the form and renders it
submitTodoform.onclick = submitTodoformFunction;

// renders the textarea and focuses on it when newProjectBtn is clicked
CreateNewProjectBtn.onclick = DOMrenderer.ToggleNewProjectTextArea;
// when enter is pressed in the newProjectTextarea creates new project of of it rerenders the button back
CreateNewProjectTextField.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    projectManager.createNewProject(e.target.value);
    DOMrenderer.ToggleNewProjectTextArea();
  }
});

// renders all todos when "All" is clicked
todoAllProjectPage.addEventListener("click", function () {
  DOMrenderer.renderAllTodos();
});

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

//
//
//

// start the page with the pages loaded
DOMrenderer.renderAllTodos();
DOMrenderer.renderProjects_mainPageContainer();

//  PLANS  //
