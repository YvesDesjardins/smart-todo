$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/categories"
  // }).done((data) => {
  //   console.log(data);
  // });

  // MODALS---------------------------
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
  // END MODALS-----------------------
});
