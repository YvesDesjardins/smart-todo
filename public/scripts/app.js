$(() => {
  // HELPERS--------------------------
  // Build todo task elements
  const buildListTask = (taskObject, listID) => {
    const taskName = taskObject.name;
    const taskID = taskObject.id;
    let $cardBody = $('<div>').addClass('card-body')
                  .append($('<p>').text(taskName).addClass('task-name').attr('id',`${taskID}-${taskName}-${listID}-task`)
                  .click(editTaskModal));
    let $checkBox = $('<div>').addClass('complete-task')
                  .attr('id',`complete-${taskID}-${listID}`).click(completeTask).append($('<p>').addClass('checkmark').text('✔️'));
    let $task = $($cardBody).append($($checkBox));
    $(`#list-${listID}`).append($($task));
  }
  // AJAX call to get the todo tasks for a category
  const writeListItems = (categoryID) => {
    $.get(`/categories/${categoryID}/tasks`)
    .done((data) => {
      for (let task of data) {
        buildListTask(task, categoryID);
      }
    })
  }
  // Build list for a category (doesn't include items)
  const buildList = (listObject) => {
    const listName = listObject.name;
    const listID = listObject.id;
    let $cardContainer = $('<div>').addClass('card bg-light mb-3 side-scroll').attr('id', `list-${listID}`);
    let $cardHeader = $('<div>').addClass('card-header category-id').text(listName).attr('id', `${listID}-${listName}-header`).click(editCatModal);
    let $listElement = $($cardContainer).prepend($($cardHeader));
    $('#lists-container').append($listElement);
  }
  // END HELPERS----------------------

  //event handler for create new task
  $("#save-task").on('click', function (event) {
    event.preventDefault();
    const toDoInput = $('#create-task-input').val();
    yelpApi(toDoInput);
    $('#add-task-modal').modal('hide');
  })

  // Create a new category
  $('#new-category-form').on('submit', function (event) {
    event.preventDefault();
    let formName = $(this).serialize();
    $.post('/categories/new', formName)
    .then($('#add-category-modal').modal('hide'));
  });
  
  //api call to yelp
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


  // AJAX call to populate the dashboard with the user's lists and items:
  $.get('/categories').done((data) => {
    for (let list of data) {
      buildList(list);
      writeListItems(list.id);
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

  // To complete a task:
  function completeTask() {
    let taskID = (this.id).split('-')[1];
    let categoryID = (this.id).split('-')[2];
    $.post(`/categories/${categoryID}/tasks/${taskID}/edit`, {
      completed: true,
      category_id: 2,
    }, 'json');
  }

  // To trigger list category name edit modal:
  function editCatModal() {
    let categoryID = (this.id).split('-')[0];
    let categoryName = (this.id).split('-')[1];
    $('#edit-category-modal form.edit').attr({
      action: `categories/${categoryID}/edit`,
    });
    $('#edit-category-modal form.delete').attr({
      action: `categories/${categoryID}/delete`,
    });
    $('#edit-category-modal input').attr('placeholder', `Enter new name for ${categoryName}`);
    $('#edit-category-modal').modal('show');
  }

  // To trigger task name edit modal:
  function editTaskModal() {
    let taskID = (this.id).split('-')[0];
    let taskName = (this.id).split('-')[1];
    let categoryID = (this.id).split('-')[2];
    $('#edit-item-modal form.edit').attr({
      action: `categories/${categoryID}/tasks/${taskID}/edit`,
    });
    $('#edit-item-modal form.delete').attr({
      action: `categories/${categoryID}/tasks/${taskID}/delete`,
    });
    $('#edit-item-modal input').attr('placeholder', `Enter new name for ${taskName}`);
    $('#edit-item-modal').modal('show');
  }

  // MODALS---------------------------
  // Listen for clicks on task names
  $('div.card-body').click(editTaskModal);

  // Listen for clicks on header of todo list categories
  $('div.card-header').click(editCatModal);

  $('#add-task').click(function () {
    $('#add-task-modal').modal('show');
  });

  $('#add-category').click(function () {
    $('#add-category-modal').modal('show');
  });

  // END MODALS-----------------------
});
