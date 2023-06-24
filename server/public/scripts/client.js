$(document).ready(onReady)

function onReady() {
getTodos()
}

// GET request to put todos from database onto DOM
function getTodos() {
    console.log("in getTodos");
    // ajax call to server to get koalas
    $.ajax({
      type: "GET",
      url: "/todo",
    })
      .then((response) => {
        renderTodos(response);
      })
      .catch((error) => {
        console.log("error in get client", error);
      });
  } // end getTodos


let todoObject = {
    task: $('#task-input').val()
}

function renderTodos(todos) {
    $("#task-box").empty();
  
    for (let i = 0; i < todos.length; i += 1) {
      let todo = todos[i];
      let newRow = $(`
      <tr data-id = ${todo.id}>
      <td>${todo.task}</td>
      <td><button class = "complete-btn">✔</button></td>
      <td><button class = "delete-btn">❌</button></td>
      </tr>
    `);
    $("#task-box").append(newRow);
    }
  }