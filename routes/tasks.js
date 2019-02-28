'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // create new category
  router.post('/:tasks', (req, res) => {
    const temp_user_id = getUserID(knex, req);

    knex('tasks').insert({
      name: req.body.name,
      api: false,
      user_id: temp_user_id
    })

    res.status(200).redirect('/');
  });
  // edit existing category name
  router.post('/:tasks/edit', (req, res) => {
    const temp_user_id = getUserID(knex, req);

    knex('tasks')
      .where('user_id', temp_user_id)
      .andWhere('id', req.body.catID)
      .update({
        name: req.body.name
      });
  });
  // delete current category
  router.post('/:tasks/delete', (req, res) => {
    const temp_user_id = getUserID(knex, req);

    knex('tasks')
      .where('user_id', temp_user_id)
      .andWhere('id', req.body.catID)
      .del();
  });

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
