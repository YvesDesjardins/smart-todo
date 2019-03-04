'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // check if user exists
  router.post('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .where('email', req.body.email)
      .then((results) => {
        // if user already exists
        if (results === []) {
          res.status(400).send('email already exists');
        }
        // user doesn't exist, create new one
        else {
          createUser(req, res);
        }
      })
      .catch((err) => {
        res.status(400).send()
      })
  });

  function createUser(req, res) {
    knex('users')
      .returning(['id'])
      .insert({
        email: req.body.email,
        password: req.body.password // bcrypt to be introduced later
      })
      .then((results) => {
        populateUserCategories(results[0].id);
        req.session.userID = req.body.email;
        res.status(200).redirect('/');
      })
      .catch((err) => {
        throw err;
      });
  }

  function populateUserCategories(userID) {
    Promise.all([
      knex('categories').insert({
        name: 'Uncategorized',
        api: 'uncat',
        user_id: userID,
      }),
      knex('categories').insert({
        name: 'Completed',
        api: 'uncat',
        user_id: userID,
      }),
      knex('categories').insert({
        name: 'Watch',
        api: 'imdb',
        user_id: userID,
      }),
      knex('categories').insert({
        name: 'Eat',
        api: 'yelp',
        user_id: userID,
      }),
      knex('categories').insert({
        name: 'Buy',
        api: 'amazon',
        user_id: userID,
      }),
      knex('categories').insert({
        name: 'Read',
        api: 'amazon',
        user_id: userID,
      }),
    ]);
  }

  return router;
}
