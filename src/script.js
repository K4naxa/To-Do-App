// modal for new todo window
const newToDoForm_modal = document.querySelector(".newToDoForm-modal");

// Button to open todo creation window
const addToDo_Btn = document.getElementById("addToDoBtn");

// container for todos
const todoContainer = document.querySelector(".container");

// main page project container
const mainWindow_ProjectsContainer = document.querySelector(".mainWindow_ProjectsContainer");
const mainWindow_MenuSection = document.getElementById("menu");

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
    const toDoCardFirstRow = document.createElement("div");

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
    toDoCardFirstRow.classList.add("toDoCardFirstRow");

    cardContent.classList.add("cardContent");
    CheckBtn.classList.add("CheckBtn");
    cardtitle.classList.add("cardtitle");

    cardControls.classList.add("cardControls");

    cardDate.classList.add("cardDate");
    EditBtn.classList.add("EditBtn");
    TrashBtn.classList.add("TrashBtn");

    // Render todo state as completed according to its state
    if (todo.state) {
      toDoCard.classList.add("toDoCompleted");
    }

    // Create Details button only if todo Details has content
    if (todo.details !== "") {
      // create Details Button
      detailsBtn.classList.add("detailsBtn");
      detailsBtn.textContent = "Details";
      cardControls.appendChild(detailsBtn);
      detailsBtn.textContent = "Details";
      detailsBtn.addEventListener("click", (e) => {
        this.rendeCardDetailsToggle(e);
      });
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

    // appending children for the elements

    todoContainer.appendChild(toDoCard);
    toDoCard.appendChild(toDoCardFirstRow);

    toDoCardFirstRow.appendChild(cardContent);

    toDoCardFirstRow.appendChild(cardControls);

    cardContent.appendChild(CheckBtn);
    cardContent.appendChild(cardtitle);

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

    EditBtn.addEventListener("click", (e) => {
      this.renderEditTodo(e);
    });
  }

  rendeCardDetailsToggle(e) {
    const todoCard = e.target.closest(".toDoCard");
    const detailsBtn = todoCard.querySelector(".detailsBtn");

    // Check if the card already has the "Edit" class
    if (todoCard.classList.contains("Edit")) {
      return;
    }
    const index = todoManager.findTodoIndex(e);

    if (todoCard.classList.contains("Details")) {
      detailsBtn.textContent = "Details";
      detailsBtn.style.cssText = "border: 2px solid #62bec1; background-color: #f7f7f7;";

      // Find the detailsCardRow and remove it
      const detailsCardRow = todoCard.querySelector(".detailsCardRow");
      if (detailsCardRow) {
        todoCard.removeChild(detailsCardRow);
      }
      todoCard.classList.remove("Details");
    } else {
      detailsBtn.textContent = "Close";
      detailsBtn.style.cssText = "border-color: orange; background-color: orange;";

      todoCard.classList.add("Details");

      // Create Details div (hidden by default)
      const detailsCardRow = document.createElement("div");
      detailsCardRow.classList.add("detailsCardRow");
      detailsCardRow.textContent = todoManager.todos[index].details;
      todoCard.appendChild(detailsCardRow);
    }
  }

  closeAddToDoForm() {
    newToDoForm_modal.classList.remove("visible");
  }

  renderAllTodos() {
    todoContainer.innerHTML = "";

    for (let i = 0; i < todoManager.todos.length; i++) {
      DOMrenderer.renderTodo(todoManager.todos[i]);
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

  renderActiveProject_MainWindow(event) {
    const list = event.target.closest(".menu");

    // Remove "activeProject" class from all <li> elements within the <ul>
    list.querySelectorAll("li").forEach((li) => {
      li.classList.remove("activeProject");
    });

    // Add "activeProject" class to the clicked element (e.target)
    event.target.classList.add("activeProject");
  }

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
        DOMrenderer.activateProject_newTodoWindow(event);
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
    const list = event.target.closest(".menu");

    // Remove "activeProject" class from all <li> elements within the <ul>
    list.querySelectorAll("li").forEach((li) => {
      li.classList.remove("activeProject");
    });

    // Add "activeProject" class to the clicked element (e.target)
    event.target.classList.add("activeProject");
  }

  renderAddToDoForm() {
    document.getElementById("createTodoForm").reset(); // resets the form
    DOMrenderer.renderProjects_newTodoWindow(); // Renders interactable project list to Addtodo form window
    newToDoForm_modal.classList.add("visible"); // makes the window visible
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

  renderEditTodo(e) {
    const todoCard = e.target.closest(".toDoCard");

    // Check if the card already has the "Edit" class
    if (todoCard.classList.contains("Edit")) {
      return;
    }

    if (todoCard.classList.contains("Details")) {
      this.rendeCardDetailsToggle(e);
    }

    // Add the "Edit" class to the card

    const index = todoManager.findTodoIndex(e);
    const todo = todoManager.todos[index];
    todoCard.classList.add("Edit");

    // Render title into text area
    const titleTextarea = document.createElement("textarea");
    titleTextarea.value = todo.title;
    todoCard.querySelector(".cardtitle").replaceWith(titleTextarea);
    titleTextarea.classList.add("textarea");

    // Render date into editable area
    const todoDateInput = document.createElement("input");
    todoDateInput.type = "date";
    todoDateInput.value = todo.date;
    todoDateInput.classList.add("todoDateInput");
    todoCard.querySelector(".cardDate").replaceWith(todoDateInput);

    // Create container for todo Details
    const detailsCardRow = document.createElement("div");
    detailsCardRow.classList.add("detailsCardRow");
    todoCard.appendChild(detailsCardRow);

    // Render Details into textarea
    const todoDetailsTextarea = document.createElement("textarea");
    todoDetailsTextarea.classList.add("todoDetailsTextarea");
    todoDetailsTextarea.value = todo.details;
    detailsCardRow.appendChild(todoDetailsTextarea);

    // Create container for Cancel and Save button
    const editButtonContainer = document.createElement("div");
    editButtonContainer.classList.add("editButtonContainer");
    todoCard.appendChild(editButtonContainer);

    // Create and style Cancel button
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.classList.add("editCancelBtn");
    editButtonContainer.appendChild(cancelBtn);

    // Create and style Save button
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.classList.add("editSaveBtn");
    editButtonContainer.appendChild(saveBtn);

    saveBtn.addEventListener("click", function () {
      todo.title = titleTextarea.value;
      todo.details = todoDetailsTextarea.value;
      todo.date = todoDateInput.value;
      memoryManager.saveTodoList();
      DOMrenderer.renderAllTodos();
    });

    cancelBtn.addEventListener("click", function () {
      DOMrenderer.renderAllTodos();
    });
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

  formatTodoDate(date) {
    const parsedDate = dateFns.parse(date, "yyyy-MM-dd", new Date());
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
    let cardTitle;
    if (targetTodoCard.classList.contains("Edit")) {
      cardTitle = targetTodoCard.querySelector(".textarea").value;
    } else {
      cardTitle = targetTodoCard.querySelector(".cardtitle").textContent; // get the title from the card
    }
    for (let i = 0, len = todoManager.todos.length; i < len; i++) {
      // loop through todos to find the index for the specific todo
      if (todoManager.todos[i].title === cardTitle) {
        return i;
      }
    }
  }

  // Funtion to control the todo progression state ON / OFF
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

  findProjectIndex(e) {
    const targetProject = e.target.closest(".project");
    const project = targetProject.innerText;
    for (let i = 0, len = projectManager.projects.length; i < len; i++) {
      if (projectManager.projects[i] === project) {
        return i;
      }
    }
  }

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

  getWeekDates() {
    let now = new Date();
    let numDay = now.getDate();

    let start = new Date(now); //copy
    start.setDate(numDay);
    start.setHours(0, 0, 0, 0);

    let end = new Date(now); //copy
    end.setDate(numDay + 7);
    end.setHours(0, 0, 0, 0);

    return [start, end];
  }
  // Function to filter todos based on a specific date
  filterTodosByDate(date) {
    const filteredTodos = todoManager.todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return todoDate.toDateString() === date.toDateString();
    });
    return filteredTodos;
  }

  // Call this function to initialize the week filter on page load
  initializeWeekFilter() {
    const [startOfWeek, endOfWeek] = this.getWeekDates();
    const filteredTodos = todoManager.todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return todoDate >= startOfWeek && todoDate <= endOfWeek;
    });
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

// Event listener for the "Day" button
todoDayProjectPage.addEventListener("click", (e) => {
  const currentDate = new Date(); // Get the current date
  const filteredTodos = projectManager.filterTodosByDate(currentDate);
  DOMrenderer.renderTodoWithFilter(filteredTodos);
  DOMrenderer.renderActiveProject_MainWindow(e);
});

// Event listener for the "Week" button
todoWeekProjectPage.addEventListener("click", (e) => {
  const [startOfWeek, endOfWeek] = projectManager.getWeekDates(); // Get the start and end of the week
  const filteredTodos = todoManager.todos.filter((todo) => {
    const todoDate = new Date(todo.date);
    return todoDate >= startOfWeek && todoDate <= endOfWeek;
  });
  DOMrenderer.renderTodoWithFilter(filteredTodos);
  DOMrenderer.renderActiveProject_MainWindow(e);
});

// renders all todos when "All" is clicked
todoAllProjectPage.onclick = DOMrenderer.renderAllTodos;

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

//TODO - make edit button work
