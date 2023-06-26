
$(document).ready(function () {
    

$('#submit-btn').on('click', postTask)
$('#task-box').on('click', '.complete-btn', todoComplete)
$('#task-box').on('click', '.delete-btn', deleteTodo)

getTodos()
})

function postTask() {
    let todoObject = {
        task: $('#task-input').val(),
        //task: $('form-control').val(),
        complete: $('#task-complete').val(),
        //complete: $('#inputGroupSelect02').val(),
    }
    $.ajax({
        method: "POST",
        url: "/todo",
        data: todoObject,
      })
        .then((response) => {
          console.log("Response from server.", response);
          $('#task-input').val(""),
          //$('.form-control').val(""),
          $('#task-complete').val("");
          //$('#inputGroupSelect02').val("");
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
    // ajax call to server to get todos
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
    //let todoId = $(this).parent().parent().data("id");
    //const todoId = $(this).closest("tr").data("id");
    let closestTr = $(this).closest("tr")
    console.log('closestTr is:', closestTr)
    console.log('closestTr html is:', $("closestTr").html())
    let todoId = closestTr.data("id")
    console.log('todoId in put', todoId)
    $.ajax({
      type: "PUT",
      url: `/todo/${todoId}`,
    })
      .then((response) => {
        console.log("todo complete is set to true", response);
        getTodos();
      })
      .catch((error) => {
        console.log("Error in complete toggle", error);
      });
  }

  //delete task
  function deleteTodo() {
    const todoId = $(this).parent().parent().data('id')
    //const todoId = $(this).closest("tr").data("id");
    console.log('in deleteTodo', todoId, $(this))
    $.ajax({
      method: 'DELETE',
      url:`/todo/${todoId}`
    })
    .then((response) => {
      console.log('delete a todo', response)
     getTodos()
    })
    .catch((error) => {
      console.log('error in delete request', error)
      alert('error with deleting a todo')
    })
  }

  function isComplete(row) {
    //turn the row into an object with $
    //:eq() filters through td by index
    const statusCell = $(row).find('td:eq(1)');
    //check the text, trim eliminates white space which can cause errors
    return statusCell.text().trim() === 'true';
  }

//render
function renderTodos(todos) {
    $("#task-box").empty();
  
    for (let i = 0; i < todos.length; i += 1) {
      let todo = todos[i];
      let newRow = $(`
      <tr data-id = "${todo.id}">
        <td>${todo.task}</td>
        <td>${todo.complete}</td>
        <td class="td-btn-style"><button class="complete-btn">Complete</button></td>
        <td class="td-btn-style"><button class = "delete-btn">Delete</button></td>

      </tr>
    `);

    //change the background color of the rows depending on true or false
    const rowIsComplete = isComplete(newRow);
    newRow.addClass(rowIsComplete ? 'true-row' : 'false-row');

    $("#task-box").append(newRow);
    }
  }