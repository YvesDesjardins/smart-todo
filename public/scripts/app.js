$(() => {

  // Build list for a category (doesn't include items)
  const buildList = (listObject) => {
    const listName = listObject.name;
    const listID = listObject.id;
    let $cardContainer = $('<div>').addClass('card bg-light mb-3 side-scroll').attr('id', listID);
    let $cardHeader = $('<div>').addClass('card-header category-id').text(listName);
    let $listElement = $($cardContainer).append($($cardHeader));
    $('#lists-container').append($listElement);
  }

  // Populate the dashboard with the user's lists and items:
  $.ajax({
    method: "GET",
    url: "/categories"
  }).done((data) => {
    pretty = JSON.stringify(data)
    console.log(pretty);
    for (let list of data) {
      console.log("list", list);
      buildList(list);
    }
  });

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
