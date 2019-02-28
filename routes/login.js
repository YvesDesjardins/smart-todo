'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // searches for users to login, currently using hardcoded 
  // users and no password check
  router.post('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .where('email', 'test@google.com')
      .then((results) => {
        // on sucessful login write to cookie and redirect
        req.session.userID = results[0].email;
        res.redirect('/');
      })
      .catch((err) => {
        throw err;
      });
  });

  return router;
}
