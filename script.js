//* Making svg object
const actionSvgs = {
  deleteSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 6h18M9 6V4h6v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
          </svg>`,
  viewSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round"
              d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            </svg>`,
  editSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-11.1 11.1a4.5 4.5 0 0 1-1.59 1.03l-3.223 1.074 1.074-3.223a4.5 4.5 0 0 1 1.03-1.59l11.1-11.1z" />
            </svg>`
}


//* Declaring Variable for editing todo which identify which todo will be edited
let selectedTodoIndex = undefined


//* Loading Todos from local storage and parsing into JSON
const allTodos = JSON.parse(localStorage.getItem("all-todos") || "[]")


//* It formats date to make it beautiful
// It its detailed argument is false is it give date in detail otherwise will be give datein short format
const formatDate = (dateStr, detailed = false) => {
  const date = new Date(dateStr)
  if (detailed) {
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }
  else {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }
}


//* HTML Elements loading
const navAddBtn = document.getElementById("nav-add-btn")
const AddTaskInputDiv = document.getElementById("add-task")
const AddTaskDivCloseBtn = document.getElementById("close-btn")
const saveTodoBtn = document.getElementById("save-todo")
const todoRows = document.getElementById("todo-rows")
const taskInput = document.getElementById("task-input")
const taskDescriptionInput = document.getElementById("task-desc")
const taskDueDateInput = document.getElementById("task-due-date")
const taskPriorityInput = document.getElementById("task-priority")
const viewTaskDiv = document.getElementById("view-task")
const viewTaskTitle = document.getElementById("view-title")
const viewTaskDescription = document.getElementById("view-desc")
const viewTaskDueDate = document.getElementById("view-date")
const viewTaskPriority = document.getElementById("view-priority")
const viewTaskCloseBtn = document.getElementById("close-view")
const smNavBar = document.getElementById("sm-nav")
const hamburger = document.getElementById("hamburger")

//* Save all todos
const saveTodos = () => {
  localStorage.setItem("all-todos", JSON.stringify(allTodos))
}

//* Create todo node & hadle message
const createTodoNode = (todo, index) => {

  //* creating elements to make a todo node
  //* todo node is a div where all detail about a todo will be shown
  
  //* todoRowDiv is parent todo div
  const todoRowDiv = document.createElement("div")
  todoRowDiv.className = "todo-row"

  //* It is checkbox which identify that todo is done or not
  const checkboxDiv = document.createElement("div")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = !!todo.done

  //* TaskDiv shows task todo in short form
  const taskDiv = document.createElement("div")
  taskDiv.className = !!todo.done ? "done" : ""
  taskDiv.classList.add("task-text")
  taskDiv.innerText = todo.task

  //* taskPriorityDiv shows task priority
  const taskPriorityDiv = document.createElement("div")
  taskPriorityDiv.className = "task-priority"
  taskPriorityDiv.innerText = todo.taskPriority

  //* It displays due date
  const taskDueDateDiv = document.createElement("div")
  taskDueDateDiv.className = "task-due-date"
  taskDueDateDiv.innerText = formatDate(todo.taskDueDate)


  //* actionButtonDiv is parent div for all action buttons (Edit, Delete, View)
  const actionButtonDiv = document.createElement("div")
  actionButtonDiv.classList.add("action-buttons")

  //* editBtn is edit button to edit todo
  const editBtn = document.createElement("button")
  editBtn.className = "edit"
  editBtn.innerHTML = actionSvgs.editSvg


  //* deleteBtn is delete button to delete task
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete"
  deleteBtn.innerHTML = actionSvgs.deleteSvg

  //* viewBtn is view button to view more details of task
  const viewBtn = document.createElement("button")
  viewBtn.className = "view"
  viewBtn.innerHTML = actionSvgs.viewSvg


  //* Assembling all element to make one node It assemble it as:
  //  <todoRowDiv>
  //   <checkboxDiv>
  //     <checkbox />
  //   </checkboxDiv>

  //   <taskDiv></taskDiv>
  //   <taskPriorityDiv></taskPriorityDiv>
  //   <taskDueDateDiv></taskDueDateDiv>

  //   <actionButtonDiv>
  //     <editBtn></editBtn>
  //     <deleteBtn></deleteBtn>
  //     <viewBtn></viewBtn>
  //   </actionButtonDiv>
  // </todoRowDiv>
  checkboxDiv.appendChild(checkbox)
  todoRowDiv.appendChild(checkboxDiv)
  todoRowDiv.appendChild(taskDiv)
  todoRowDiv.appendChild(taskPriorityDiv)
  todoRowDiv.appendChild(taskDueDateDiv)

  actionButtonDiv.appendChild(editBtn)
  actionButtonDiv.appendChild(deleteBtn)
  actionButtonDiv.appendChild(viewBtn)

  todoRowDiv.appendChild(actionButtonDiv)


  //* adding listners on action buttons & checkbox

  //* Checkbox listener It listen checkbox change and itdentify task is done or not
  // it also save todos and rander on DOM
  checkbox.addEventListener("change", () => {
    todo.done = checkbox.checked
    saveTodos()
    render()
  })

  //* Listener for delete button to delete task
  // it also save todos and rander on DOM
  deleteBtn.addEventListener("click", () => {
    allTodos.splice(index, 1)
    saveTodos()
    render()
  })

  //* Listener for view button to view more details of task
  viewBtn.addEventListener("click", () => {
    viewTaskTitle.innerText = todo.task
    viewTaskDescription.innerText = todo.taskDescription
    viewTaskDueDate.innerText = formatDate(todo.taskDueDate, true)
    viewTaskPriority.innerText = todo.taskPriority
    viewTaskDiv.style.display = "flex"
  })

  //* Listener for edit button to edit task
  // It first set flex display of AddTaskInputDiv
  // Then put details of todos in input and set selectedTodoIndex to index of current todo
  editBtn.addEventListener("click", () => {
    AddTaskInputDiv.style.display = "flex";
    taskInput.value = todo.task
    taskDescriptionInput.value = todo.taskDescription
    taskDueDateInput.value = todo.taskDueDate
    taskPriorityInput.value = todo.taskPriority
    selectedTodoIndex = index
  })

  //* Return Node of Todo with the name of todoRowDiv
  return todoRowDiv
}

//* Handling All DOM Manupulation & Global Event Handling

//* navAddBtn is a button in navbar which set flex display of AddTaskInputDiv
navAddBtn.addEventListener("click", () => {
  AddTaskInputDiv.style.display = "flex";
})

//* saveTodoBtn is a button to add new task in all-todos basically it only run addTodo() function
saveTodoBtn.addEventListener("click", () => {
  addTodo(selectedTodoIndex)
})

//* AddTaskDivCloseBtn set none display of AddTaskInputDiv
AddTaskDivCloseBtn.addEventListener("click", () => {
  taskInput.value = ""
  taskDescriptionInput.value = ""
  taskDueDateInput.value = ""
  taskPriorityInput.value = ""
  selectedTodoIndex = undefined
  AddTaskInputDiv.style.display = "none";
})

//* viewTaskCloseBtn set none display of AddTaskInputDiv and reset all viewTaskDiv values 
viewTaskCloseBtn.addEventListener("click", () => {
  viewTaskTitle.innerText = ""
  viewTaskDescription.innerText = ""
  viewTaskDueDate.innerText = ""
  viewTaskPriority.innerText = ""
  viewTaskDiv.style.display = "none"
})

//* it controls all events on clicking hamburger
hamburger.addEventListener("click", () => {
  smNavBar.style.display = smNavBar.style.display == "flex"? "none": "flex"
  hamburger.classList.toggle("active")
})



//* Adds new TODO
const addTodo = (indexToReplace) => {
  //* This if statement checks indexToReplace. If it will be undefined it mean no todo is seleted to edit
  if (indexToReplace === undefined) {
    //* This if statement checks all tasks input that no one should be empty
    if (taskInput.value && taskDescriptionInput.value && taskDueDateInput.value && taskPriorityInput.value) {
      //* An object of new todo to add in allTodos
      let newTodo = {
        task: taskInput.value,
        taskDescription: taskDescriptionInput.value,
        taskDueDate: taskDueDateInput.value,
        taskPriority: taskPriorityInput.value,
      }
      // Append newTodo in the start of allTodos start
      allTodos.unshift(newTodo)
      // Save Todos
      saveTodos()
      // Render todos in DOM
      render()
      // set none display of AddTaskInputDiv
      AddTaskInputDiv.style.display = "none";
    }
  }

  //* If indexToReplace is not undefined. It means some one todo is selected to edit
  else {
    //* This if statement checks all tasks input that no one should be empty
    if (taskInput.value && taskDescriptionInput.value && taskDueDateInput.value && taskPriorityInput.value) {
      //* An object of edited todo to add in allTodos on the place on selected index
      let editedTodo = {
        task: taskInput.value,
        taskDescription: taskDescriptionInput.value,
        taskDueDate: taskDueDateInput.value,
        taskPriority: taskPriorityInput.value,
      }
      //* Add todo in allTodos on the place on selected index
      allTodos[indexToReplace] = editedTodo
      // Save Todos
      saveTodos()
      // Render todos in DOM
      render()
      // set none display of AddTaskInputDiv
      AddTaskInputDiv.style.display = "none";
      // Set selectedTodoIndex to undefined so that no one todo is selected
      selectedTodoIndex = undefined
    }
  }
  // After editing or adding a task, reset all inputs to blank
  taskInput.value = ""
  taskDescriptionInput.value = ""
  taskDueDateInput.value = ""
  taskPriorityInput.value = ""
}

//* Render all todos by adding in in DOM
const render = () => {
  todoRows.innerHTML = ""

  if (!allTodos.length) {
    todoRows.innerHTML = "<p class='empty'>No tasks yet. Add one!</p>"
    return
  }
  
  allTodos.forEach((todo, index) => {
    todoRows.appendChild(createTodoNode(todo, index))
  })
}


//* render Function is runing first time
render()
