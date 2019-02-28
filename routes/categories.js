'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all current categories for user
  router.get('/', (req, res) => {
    getUserID(knex, req.session.userID, (temp_user_id => {
      knex('categories')
        .select('*')
        .where('user_id', temp_user_id)
        .then((results) => {
          console.log(results);
          res.json(results);
        })
        .catch((err) => {
          throw err;
        });
    }));
  });

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
