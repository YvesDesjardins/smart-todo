$(() => {

function yelpApi() {
  $.ajax({
    method: 'GET',
    url: '/api/yelp'
  }).then((res) => {
    console.log('res', res);
  })
  .catch((err) =>{
    console.log('error', err);
  })
};
console.log('work');
yelpApi();


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


