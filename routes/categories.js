'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // create new category
  router.post('/:categories', (req, res) => {
    const temp_user_id = getUserID(knex, req.session.userID);

    knex('categories').insert({
      name: req.params.categories,
      api: false,
      user_id: temp_user_id
    })

    res.status(200).redirect('/');
  });
  // edit existing category name
  router.post('/:categories/edit', (req, res) => {
    const temp_user_id = getUserID(knex, req.session.userID);

    knex('categories')
      .where('user_id', temp_user_id)
      .andWhere('name', req.params.categories)
      .update({
        name: req.body.name
      });
  });
  // delete current category
  router.post('/:categories/delete', (req, res) => {
    const temp_user_id = getUserID(knex, req.session.userID);

    knex('categories')
      .where('user_id', temp_user_id)
      .andWhere('name', req.params.categories)
      .del();
  });

  return router;
}

function getUserID(knex, uid) {
  knex('users')
    .select('*')
    .where('email', uid)
    .then((results) => {
      return results[0].id;
    });
}
