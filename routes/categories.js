'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all current categories for user
  router.get('/', (req, res) => {
    // getUserID(knex, req.session.userID, (temp_user_id => {
    getUserID(knex, req.session.userID).then((temp_user_id) => {
        knex('categories')
          .select('*')
          .where('user_id', temp_user_id[0].id)
          .then((results) => {
            res.json(results);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  });

  // create new category
  router.post('/:category', (req, res) => {
    getUserID(knex, req.session.userID).then((temp_user_id) => {
        knex('categories')
          .insert({
            name: req.params.category,
            api: req.body.api,
            user_id: temp_user_id[0].id
          })
          .then();

        res.status(200).redirect('/');
      })
      .catch((err) => {
        throw err;
      });
  });
  // edit existing category name
  router.post('/:category/edit', (req, res) => {
    getUserID(knex, req.session.userID).then((temp_user_id) => {
        knex('categories')
          .where('user_id', temp_user_id[0].id)
          .andWhere('name', req.params.category)
          .update({
            name: req.body.name
          });
        res.status(200).redirect('/');
      })
      .catch((err) => {
        throw err;
      });
  });
  // delete current category
  router.post('/:category/delete', (req, res) => {
    getUserID(knex, req.session.userID).then((temp_user_id) => {
        knex('categories')
          .where('user_id', temp_user_id[0].id)
          .andWhere('name', req.params.category)
          .del()
          .then();
        res.status(200).redirect('/');
      })
      .catch((err) => {
        throw err;
      });
  });

  return router;
}
