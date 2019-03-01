'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all current categories for user
  router.get('/', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('categories')
          .select('*')
          .where('user_id', temp_user_id[0].id)
          .then((results) => {
            res.json(results);
          })
          .catch((err) => {
            res.status(401).send('user has no categories');
          });
      })
      .catch((err) => {
        res.status(401).send('user not logged in');
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
        res.status(401).send('user not logged in');
      });
  });
  // edit existing category name
  router.post('/:category/edit', (req, res) => {
    getUserID(knex, req.session.userID).then((temp_user_id) => {
        knex('categories')
          .where('user_id', temp_user_id[0].id)
          .andWhere('name', req.params.category)
          .update({
            name: req.body.name,
            api: req.body.api,
            user_id: req.body.user_id,
          })
          .then();
        res.status(200).redirect('/');
      })
      .catch((err) => {
        res.status(401).send('user not logged in/category does not exist');
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
        res.status(401).send('user not logged in/category does not exist');
      });
  });

  return router;
}
