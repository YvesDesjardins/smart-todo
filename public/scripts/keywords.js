const keywords = {
  read: ['read', 'book', 'study', 'learn', 'translate', 'view', 'album', 'booklet',
    'magazine', 'novel', 'write', 'copy'],

  watch: ['movie', 'cinema', 'film', 'show', 'video', 'watch',
  'see', 'series', 'netflix'],

  eat: ['restaurants', 'bar', 'pub', 'cafe', 'coffee shop', 'bistro', 'hungry',
    'eat', 'dinner', 'lunch', 'breakfast', 'brunch', 'snack', 'groceries'],

  buy: ['buy', 'shopping', 'products', 'purchase', 'value', 'browse',
  'spend', 'brand', 'merchandise']
};


function callApi(word) {

  for(let category in keywords) {
    if(keywords[category].includes(word)) {

    }
  }
}
callApi('');
