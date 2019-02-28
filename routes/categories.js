'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // searches for users to login, currently using hardcoded 
  // users and no password check
  router.post('/:categories', (req, res) => {
    const temp_user_id = knex('users').select('id').where('id', req.session.userID);
    console.log(temp_user_id);
    // knex('categories').insert()
  });
  router.post('/:categories/edit', (req, res) => {});
  router.post('/:categories/delete', (req, res) => {});

  return router;
}
