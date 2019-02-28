$(() => {
  $('#example-edit-task-modal').click(function () {
    $('#edit-item-modal').modal('show');
  });

  $('#example-edit-category-modal').click(function () {
    $('#edit-category-modal').modal('show');
  });

  $('#add-task').click(function () {
    $('#add-task-modal').modal('show');
  });

  $('#add-category').click(function () {
    $('#add-category-modal').modal('show');
  });

  // Below is the starter code
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   // Placeholder that prints the names of all the users
  //   // for(user of users) {
  //   //   $("<div>").text(user.name).appendTo($("body"));
  //   // }
  // });;
});
