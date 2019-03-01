$(() => {

  $("#save-task").on('click', function (event) {
    event.preventDefault();
    const toDoInput = $('#create-task-input').val();
    yelpApi(toDoInput);
    $('#add-task-modal').modal('hide');
  })

function yelpApi(toDoInput) {

  var inputData = {
    text : toDoInput
  }
  $.ajax({
      method: 'GET',
      url: '/api/yelp',
      data: inputData
    }).then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log('error', err);
    })
  };




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
