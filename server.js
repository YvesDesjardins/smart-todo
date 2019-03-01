"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const https = require('https');
const request = require('request');

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});



app.get('/api/yelp', (req, res) => {

  const apiKey = 'Bearer ' + 'Nq6iLL8agQjx_UJ0s0IF5FwIKSs1FZ8r_XcOz6ChLvXOQUTSH7ZYpLnAGFl03tpPrAFJh0Naguga1lg3xAttXxbbsg7PPT_JI12LK-_NkaWpe1npsWBHel6qQIJ4XHYx';

  const getOptions = {
    uri: 'https://api.yelp.com/v3/businesses/search?location="Vancouver"',
    method: 'GET',
    headers: {
      'Authorization': apiKey
    }
  };

  //****USE REQUEST NOT HTTPS */
  request(getOptions, (err, response, body) => {
    res.json(body);
  })
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
