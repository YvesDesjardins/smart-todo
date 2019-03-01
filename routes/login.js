'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // currently using hardcoded users and no password check
  router.post('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .where('email', 'test@google.com')
      // on sucessful login write to cookie and redirect
      .then((results) => {
        req.session.userID = results[0].email;
        res.redirect('/');
      })
      .catch((err) => {
        res.status(401).send('user does not exist');
      });
  });

  return router;
}
