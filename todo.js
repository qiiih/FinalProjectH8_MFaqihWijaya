const btnTodo = document.getElementById("btn-todo")

btnTodo.addEventListener("click", (ev) => {
    addTodo()
})

const displayTodo = () => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    const todoList = !todos || !todos.length===0 ? '' : (
        todos.map(el => {
            return (
                `<ul class="list-group list-group-horizontal rounded-0 bg-transparent m-4" id=${el.id}>
                    <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input me-0" onchange="checkTodo(${el.id})" ${el.checked ? "checked" : ""}>
                        </div>
                    </li>
                    <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                        <p class="lead fw-normal mb-0">${el.name}</p>
                    </li>
                    <li class="list-group-item px-3 py-1 d-flex align-items center border-0 bg-transparent">
                        <button class="btn btn-danger" type="button" onclick="removeTodo(${el.id})">Delete</button>
                    </li>
                </ul>`
            )
        }).join("")
    )
    document.getElementById("list-todo").innerHTML = todoList
}

function addTodo() {
    const addTodoForm = document.getElementById("add-todo")
    const todo = addTodoForm.value

    let todos = JSON.parse(localStorage.getItem("todos"))

    const todoObj = {
        id: !todos || todos.length === 0 ? 0 : todos[todos.length - 1].id + 1,
        name : todo,
        checked : false
    }

    todos ? todos.push(todoObj) : todos = [todoObj]

    localStorage.setItem("todos", JSON.stringify(todos))

    addTodoForm.value = ""

    displayTodo()
}

function removeTodo(todoId) {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const newTodos = todos.filter(el => el.id !== todoId)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    displayTodo()
}

function checkTodo(todoId) {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const newTodos = todos.map(el => {
        return el.id !== todoId ? el : {id: el.id, name: el.name, checked: !el.checked}
    })
    localStorage.setItem("todos", JSON.stringify(newTodos))
    displayTodo()
}