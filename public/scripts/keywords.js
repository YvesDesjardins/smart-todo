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

//takes word from entry and puts in category
function taskEntry(entry) {
let words = entry.split(' ');
for (let word of words) {
  getCategory(word);
  }
}

//chooses category with word from taskEntry
function getCategory(word) {
  for(let category in keywords) {
    if(keywords[category].includes(word)) {
      return category
    }
  }
}


function searchApiFor(word) {

}
  const classifiers = [
    { category: 'read', apiCall: amazon},
    { category: 'write', apiCall: amazon },
    { category: 'watch', apiCall: imdb },
    { category: 'eat', apiCall: yelp },
  ];

  // API oriented
    for (let classifier in classifiers) {
      // apiCall returns
      if (classifier.apiCall(word)) {
        // Do whatever we do when a category matches
      };
    }

// getCategory('');

