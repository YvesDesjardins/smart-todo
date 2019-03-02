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
        // otherwise create user and redirect
        else {
          knex('users').insert({
              email: req.body.email,
              password: req.body.password // bcrypt to be introduced later
            })
            .then(() => {
              res.status(200).redirect('/');
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  });

  return router;
}
