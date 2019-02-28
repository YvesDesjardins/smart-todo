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
          res.json(results);
        })
        .catch((err) => {
          throw err;
        });
    }));
  });

  // create new category
  router.post('/:category', (req, res) => {
    getUserID(knex, req.session.userID, (temp_user_id => {
      knex('categories')
        .insert({
          name: req.params.category,
          api: req.body.api,
          user_id: temp_user_id
        })
        .then();

      res.status(200).redirect('/');
    }));
  });
  // edit existing category name
  router.post('/:category/edit', (req, res) => {
    getUserID(knex, req.session.userID, (temp_user_id => {
      knex('categories')
        .where('user_id', temp_user_id)
        .andWhere('name', req.params.category)
        .update({
          name: req.body.name
        });
    }));

    res.status(200).redirect('/');
  });
  // delete current category
  router.post('/:category/delete', (req, res) => {
    getUserID(knex, req.session.userID, (temp_user_id => {
      knex('categories')
        .where('user_id', temp_user_id)
        .andWhere('name', req.params.category)
        .del()
        .then()
    }));

    res.status(200).redirect('/');
  });

  return router;
}
