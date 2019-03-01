$(() => {

  // Build todo task elements
  const buildListTask = (taskObject, listID) => {
    const taskName = taskObject.name;
    console.log("task object", taskObject)
    console.log("task name", taskName);
    const taskID = taskObject.id;
    let $cardBody = $('<div>').addClass('card-body')
                    .append($('<p>').text(taskName))
    let $checkBox = $('<div>').addClass('form-check')
                    .append($('<input>').addClass('form-check-input').attr({
                      type: "checkbox",
                      value: "",
                      id: taskID
                    }));
    let $task = $($cardBody).append($($checkBox));
    $(`#${listID}`).append($($task));
  }

  // AJAX call to get the todo tasks for a category
  const getListItems = (categoryID) => {
    $.ajax({
      method: "GET",
      url: `/categories/${categoryID}/tasks`
    }).done((data) => {
      pretty = JSON.stringify(data);
      console.log(pretty);
      for (let task of data) {
        console.log("task", task);
        buildListTask(task, categoryID);
      }
    })
  }

  // Build list for a category (doesn't include items)
  const buildList = (listObject) => {
    const listName = listObject.name;
    const listID = listObject.id;
    let $cardContainer = $('<div>').addClass('card bg-light mb-3 side-scroll').attr('id', listID);
    let $cardHeader = $('<div>').addClass('card-header category-id').text(listName);
    let $listElement = $($cardContainer).prepend($($cardHeader));
    $('#lists-container').append($listElement);
  }

  // AJAX call to populate the dashboard with the user's lists and items:
  $.ajax({
    method: "GET",
    url: "/categories"
  }).done((data) => {
    for (let list of data) {
      buildList(list);
      getListItems(list.id);
    }
  });

  // YELP API:
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
  // console.log('work');
  // yelpApi();


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


