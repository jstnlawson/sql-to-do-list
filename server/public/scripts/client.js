$(document).ready(onReady)

function onReady() {
getTodos()
$('#submit-btn').on('click', postTask)
$('#task-box').on('click', '.complete-btn', todoComplete)
}

function postTask() {
    let todoObject = {
        task: $('#task-input').val(),
        complete: $('#task-complete').val(),
    }
    $.ajax({
        method: "POST",
        url: "/todo",
        data: todoObject,
      })
        .then((response) => {
          console.log("Response from server.", response);
          $('#task-input').val(""),
          $('#task-complete').val("");
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

  //put/complete function
  function todoComplete() {
    let idToUpdate = $(this).parent().parent().data("id");
    //let idToUpdate = $(this).parent().data("id");
    $.ajax({
      type: "PUT",
      url: `/todo/${idToUpdate}`,
    })
      .then((response) => {
        console.log("todo complete is set to true", response);
        getTodos();
      })
      .catch((error) => {
        console.log("Error in complete toggle", error);
      });
  }

//render
function renderTodos(todos) {
    $("#task-box").empty();
  
    for (let i = 0; i < todos.length; i += 1) {
      let todo = todos[i];
      let newRow = $(`
      <tr data-id = ${todo.id}>
        <td>${todo.task}</td>
        <td>${todo.complete}</td>
        <td><button class="complete-btn">Complete?</button></td>
        <td><button class = "delete-btn">❌</button></td>
      </tr>
    `);
    $("#task-box").append(newRow);
    }
  }