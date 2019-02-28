'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .where('email', 'test@google.com')
      // .where('email', req.body.email)
      // .andWhere('password', req.body.password)
      .then((results) => {
        console.log(`you are user ${results}`);
        res.json(results);
      });
  });

  return router;
}
