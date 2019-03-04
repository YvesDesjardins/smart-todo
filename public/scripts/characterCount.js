$(() => {

  //add maxLength attribute to all input fields
  $('input[type="text"]').attr({
    maxLength: 30
  })

  // add maxLength and a counter to all input fields
  $('input[type="text"]').on(`input`, function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('input[type="text"]').attr({
      maxLength: 30
    })
    let $textAreaLeng = $(this).val().length;
    let $counter = $(this).parent().find('.counter');
    $counter.text(30 - $textAreaLeng);
    if ($textAreaLeng > 30) {
      $counter.css(`color`, `red`);
    } else {
      $counter.css(`color`, `black`);
    }
  })

  // if we decide to add the counter, the code below would be added to
  // index.ejs in all the modal forms below the input tags.

  /* < span class = "counter" > 30 < /span> */

});
