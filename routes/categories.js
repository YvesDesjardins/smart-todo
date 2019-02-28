'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // searches for users to login, currently using hardcoded 
  // users and no password check
  router.post('/:categories', (req, res) => {
    const temp_user_id = getUserID(knex, req);

    // knex('categories').insert()
    res.send();
  });
  router.post('/:categories/edit', (req, res) => {});
  router.post('/:categories/delete', (req, res) => {});

  return router;
}

function getUserID(knex, req) {
  knex('users')
    .select('*')
    .where('email', req.session.userID)
    .then((results) => {
      return results[0].id;
    });
}
