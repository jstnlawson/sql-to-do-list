$(document).ready(onReady)

function onReady() {
getTodos()
$('#submit-btn').on('click', postTask)
}

function postTask() {
    let todoObject = {
        task: $('#task-input').val()
    }
    $.ajax({
        method: "POST",
        url: "/todo",
        data: todoObject,
      })
        .then((response) => {
          console.log("Response from server.", response);
          $('#task-input').val()
          getTodos();
        })
        .catch((error) => {
          console.log("Error in POST", error);
          alert("Unable to add task at this time.");
        });

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