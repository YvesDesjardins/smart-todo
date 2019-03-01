'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');
const app = express();
const request = require('request');

// cookie-session
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['somesecretkeyiguess'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const categoriesRoutes = require('./routes/categories');
const tasksRoutes = require('./routes/tasks');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes
app.use('/login', loginRoutes(knex));
app.use('/logout', logoutRoutes());
app.use('/categories', categoriesRoutes(knex));
app.use('/categories', tasksRoutes(knex));

// Home page, renders index and passes back userID
app.get('/', (req, res) => {
  res.render('index', {
    email: req.session.userID,
  });
});

<<<<<<< HEAD
//yelp API request
app.get('/api/yelp', (req, res) => {

  const todoSearchTerm = req.query.text;
=======
// yelp api route
app.get('/api/yelp', (req, res) => {
  //   console.log("Test");
  // console.log('req', req);
  // console.log('params', req.query.text);
  var todoSearchTerm = req.query.text;
>>>>>>> 811ac3f7b3388b158b757316d4d481995cf7192b
  const apiKey = 'Bearer ' + 'Nq6iLL8agQjx_UJ0s0IF5FwIKSs1FZ8r_XcOz6ChLvXOQUTSH7ZYpLnAGFl03tpPrAFJh0Naguga1lg3xAttXxbbsg7PPT_JI12LK-_NkaWpe1npsWBHel6qQIJ4XHYx';

  //added item limit but not working atm
  const getOptions = {
    uri: 'https://api.yelp.com/v3/businesses/search?location="Vancouver"&limit=10&term="' + todoSearchTerm + '"',
    method: 'GET',
    headers: {
      'Authorization': apiKey
    }
  };

  //****USE REQUEST NOT HTTPS ****/
  request(getOptions, (err, response, body) => {
    const parsedRes = JSON.parse(body);
    const apiCategory = parsedRes.businesses[0].categories[0].alias;
    const getCat = getCategory(apiCategory) || 'Uncatagorized';
    console.log(getCat);
    res.json(body);
  })
});

const keywords = {
  read: ['read', 'book', 'study', 'learn', 'translate', 'view', 'album', 'booklet',
    'magazine', 'novel', 'write', 'copy'
  ],

  watch: ['movie', 'cinema', 'film', 'show', 'video', 'watch',
    'see', 'series', 'netflix'
  ],

  eat: ['restaurants', 'bar', 'pub', 'cafe', 'coffee shop', 'bistro', 'hungry',
    'eat', 'dinner', 'lunch', 'breakfast', 'brunch', 'snack', 'groceries'
  ],

  buy: ['buy', 'shopping', 'products', 'grocery', 'purchase', 'value', 'browse',
    'spend', 'brand', 'merchandise'
  ]

};

//chooses category with word from taskEntry
function getCategory(word) {
  for (let category in keywords) {
    if (keywords[category].includes(word)) {
      return category
    }
  }
}

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
