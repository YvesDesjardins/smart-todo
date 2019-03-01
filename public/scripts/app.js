// import { post } from "request";

$(() => {
  // HELPERS--------------------------
  // Build todo task elements
  const buildListTask = (taskObject, listID) => {
    const taskName = taskObject.name;
    const taskID = taskObject.id;
    let $cardBody = $('<div>').addClass('card-body').attr('id',
        `${taskID}-${taskName}-${listID}-task`)
      .click(editTaskModal)
      .append($('<p>').text(taskName))
    let $checkBox = $('<div>').addClass('form-check')
      .append($('<input>').addClass('form-check-input').attr({
        type: "checkbox",
        value: "",
      }));
    let $task = $($cardBody).append($($checkBox));
    $(`#list-${listID}`).append($($task));
  }
  // AJAX call to get the todo tasks for a category
  const writeListItems = (categoryID) => {
    $.ajax({
      method: "GET",
      url: `/categories/${categoryID}/tasks`
    }).done((data) => {
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
    yelpApi(toDoInput, (result) => {
      $.ajax({
        method: 'POST',
        url: '/api/yelp',
        data: serialized
      }).done((task) => {
        console.log('&&&', task);
        knex('categories')
          .insert({
            name: req.body.name,
            api: req.body.api,
            category_id: temp_category_id[0].id
          })
        console.log("****todoinput", toDoInput);
        return task;
      })

    });
    $('#add-task-modal').modal('hide');

    // post to-do's from yelp api
    const serialized = $(this).serialize();

  });

  //api call to yelp
  function yelpApi(toDoInput, callback) {
    console.log("+++++++ yelpAPI insie");
    var inputData = {
      text: toDoInput
    }
    $.ajax({
        method: 'GET',
        url: '/api/yelp',
        data: inputData
      }).then((res) => {
        //categorize to dos
        const parsedRes = JSON.parse(res);
        console.log('res', parsedRes.businesses);
        callback(parsedRes.businesses);
      })
      .catch((err) => {
        console.log('error', err);
      })
  };

  // AJAX call to populate the dashboard with the user's lists and items:
  $.ajax({
    method: "GET",
    url: "/categories"
  }).done((data) => {
    for (let list of data) {
      buildList(list);
      writeListItems(list.id);
    }
  });

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
  // END MODALS-----------------------
});
