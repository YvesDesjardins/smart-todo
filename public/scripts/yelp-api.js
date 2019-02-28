'use strict';

const yelp = require('yelp-fusion');

const apiKey = '-JNonwyUgWBSeF9CtaLXbFBV6kcc6ccx1PT - PppYbYflQGT_WjI - bnzzdT2e9HLt2cOtlp6NdslpZM_ubblVBZX9nXWrQnBuy7XRo9zsVP2L2nB7UPM7X3SzqUV4XHYx';

const searchRequest = {
  term: 'get a coffee',
  location: 'vancouver, bc'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});