$(() => {
// 'use strict';
// 'https://api.yelp.com/v3/businesses/search'

// const apiKey = '-JNonwyUgWBSeF9CtaLXbFBV6kcc6ccx1PT - PppYbYflQGT_WjI - bnzzdT2e9HLt2cOtlp6NdslpZM_ubblVBZX9nXWrQnBuy7XRo9zsVP2L2nB7UPM7X3SzqUV4XHYx';

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



  // function createTable(table) {
  //   //take data from database and put in variables
  //   //....

  //   //MAIN PAGE >> dynamic jQuery from html
  //   const $article = $("<article>").addClass("category");
  //   const $header = $("<header>")
  //   const $h3 = $("<h3>").addClass("category-name");
  //   const $ul = $("<ul>").addClass("item-list");
  //   const $li = $("<li>")

  //   //parent/child format;
  //   $article.append($header);
  //   $header.append($h3);
  //   $article.append($ul);
  //   $ul.append($li);

  //   return $article;
  // };
});


