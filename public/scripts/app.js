$(() => {

  refreshContent = () => {
    $('#lists-container').empty();
    renderContent();
  }

  renderContent();

  hideModalAndClear = (modalID, formID) => {
    $(modalID).modal('hide');
    $(formID).trigger('reset');
  }
  // HELPERS--------------------------
  // Build todo task elements
  const buildListTask = (taskObject, listID) => {
    const taskName = taskObject.name;
    const taskID = taskObject.id;
    let $cardBody = $('<div>').addClass('card-body')
      .append($('<p>').text(taskName).addClass('task-name').attr('id', `${taskID}-${taskName}-${listID}-task`)
        .click(editTaskModal));
    let $checkBox = $('<div>').addClass('complete-task')
      .attr('id', `complete-${taskID}-${listID}`).click(completeTask).append($('<p>').addClass('checkmark').text('✔️'));
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

  const addCategoryToTaskEditModal = (catName, catID) => {
    $('#edit-task-form select').append($('<option>').text(catName).val(Number(catID)));
  }
  // END HELPERS----------------------

  //event handler for create new task
  $("#save-task").on('click', function (event) {
    event.preventDefault();
    const toDoInput = $('#create-task-input').val();
    yelpApi(toDoInput);
    hideModalAndClear('#add-task-modal', '#add-task-form');
  })

  // Create a new category
  $('#new-category-form').on('submit', function (event) {
    event.preventDefault();
    let catName = $(this).serialize();
    $.post('/categories/new', catName)
      .then(hideModalAndClear('#add-category-modal', '#new-category-form'))
      .then(refreshContent());
  });

  // Edit category name
  $('#edit-category-form').on('submit', function (event) {
    event.preventDefault();
    let catName = $(this).serialize();
    let catID = $(this).attr('data-id');
    $.post(`/categories/${catID}/edit`, catName)
      .then(hideModalAndClear('#edit-category-modal', '#edit-category-form'))
      .then(refreshContent());
  });

  // Delete category
  $('#delete-category-form').on('click', function (event) {
    let catID = $(this).attr('data-id');
    $.post(`/categories/${catID}/delete`)
      .then(hideModalAndClear('#edit-category-modal', '#edit-category-form'))
      .then(refreshContent());
  });

  // Edit task name
  $('#edit-task-form').on('submit', function (event) {
    event.preventDefault();
    let taskID = $(this).attr('data-task-id');
    let newTaskName = $('#edit-task-name').val();
    let newCatID = $('.form-control').find(':selected').val();
    let catID = $(this).attr('data-cat-id');

    let data = {
      category_id: newCatID === 'Choose a new category' ? catID : newCatID,
      name: newTaskName === '' ? $(this).attr('data-task-name') : newTaskName,
    }
<<<<<<< HEAD
=======
    console.log('data', data);
>>>>>>> 0e969d5da45950a5af5d95f846756c0808ebf67d

    $.post(`/categories/${catID}/tasks/${taskID}/edit`, data)
      .then(hideModalAndClear('#edit-item-modal', '#edit-task-form'))
      .then(refreshContent());;
  });

  // Delete task
  $('#delete-task-form').on('click', function (event) {
    let taskID = $(this).attr('data-task-id');
    let catID = $(this).attr('data-cat-id');
    $.post(`/categories/${catID}/tasks/${taskID}/delete`)
      .then(hideModalAndClear('#edit-item-modal', '#edit-task-form'))
      .then(refreshContent());;
  });

  //api call to yelp
  function yelpApi(toDoInput) {
    var inputData = {
      text: toDoInput
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
  function renderContent() {
    $.get('/categories').done((data) => {
      for (let list of data) {
        addCategoryToTaskEditModal(list.name, list.id);
        buildList(list);
        writeListItems(list.id);
      }
    });
  }

  // YELP API:
  function yelpApi() {
    $.ajax({
        method: 'GET',
        url: '/api/yelp'
      }).then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
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
    }, 'json').then(refreshContent());
  }

  // To trigger list category name edit modal:
  function editCatModal() {
    let categoryID = (this.id).split('-')[0];
    let categoryName = (this.id).split('-')[1];
    $('#edit-category-modal form').attr({
      "data-id": categoryID,
    });
    $('#delete-category-form').attr({
      "data-id": categoryID,
    });
    $('#edit-category-modal input').attr('placeholder', `Enter new name for ${categoryName}`).val(categoryName);
    $('#edit-category-modal').modal('show');
  }

  // To trigger task name edit modal:
  function editTaskModal() {
    let taskID = (this.id).split('-')[0];
    let taskName = (this.id).split('-')[1];
    let categoryID = (this.id).split('-')[2];
    $('#edit-task-form').attr({
      "data-task-id": taskID,
      "data-cat-id": categoryID,
      "data-task-name": taskName,
    });
    $('#delete-task-form').attr({
      "data-task-id": taskID,
      "data-cat-id": categoryID,
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
