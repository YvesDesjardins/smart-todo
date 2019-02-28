$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    // Placeholder that prints the names of all the users
    // for(user of users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });;
});
