'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const router = express.Router();

module.exports = (knex) => {

  // create new category
  router.post('/:categories', (req, res) => {
    const temp_user_id = getUserID(knex, req.session.userID);
    console.log(temp_user_id);
    knex('categories').insert({
      name: 'test', //req.params.categories,
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
