//grabbing

const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');

//console.log(todoInput.innerText);


//Events
document.addEventListener('DOMContentLoaded', fromLocal);



todoButton.addEventListener("click", addTodo);



todoList.addEventListener("click", deleteCheck);
filteroption.addEventListener("click", filterTodo);



function addTodo(event) {
    event.preventDefault();



    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");


    //Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
   // console.log(todoInput.value);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //to local storage

    saveLocal(todoInput.value);


    //button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //Appending

    todoList.appendChild(todoDiv);
    todoInput.value = "";

}

function deleteCheck(e) {
    //console.log(e.target)
    const item = e.target;
    //For deleting to-do
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animatuion class
        todo.classList.add("fall");
        removeLocal(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //Marking as completed 

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    //console.log(todos);
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";

                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";

                } else {
                    todo.style.display = "none";
                }
                break;
            case "non":
                todo.style.display = "none";
                break;


        }
    });
}


function saveLocal(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function fromLocal() {
    //    console.log("hello");
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");


        //Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //to local storage


        //button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);


        //Appending

        todoList.appendChild(todoDiv);

    });

}


function removeLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //console.log();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    // const todoIndex=todo.childNodes[0].innerText;
    // console.log(todoIndex);
    //todos.splice(todos.indexOf(todoIndex),1);
    //   localStorage.setItem("todos".JSON.stringify(todos));


}