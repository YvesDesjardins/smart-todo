'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const router = express.Router();
const protectedCategories = ['Completed', 'Uncategorized', 'Eat', 'Watch', 'Read', 'Buy'];

module.exports = (knex) => {

  // returns all categories for user
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
  router.post('/new', (req, res) => {
    if (protectedCategories.indexOf(req.body.name) === -1) {
      getUserID(knex, req.session.userID)
        .then((temp_user_id) => {
          knex('categories')
            .insert({
              name: req.body.name,
              api: req.body.api,
              user_id: temp_user_id[0].id
            })
            .then((results) => {
              res.status(200).redirect('/');
            });
        })
        .catch((err) => {
          res.status(401).send('user not logged in');
        });
    } else {
      res.status(401).send('Can not create category with that name');
    }
  });
  // edit current category
  router.post('/:category_id/edit', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('categories')
          .where('user_id', temp_user_id[0].id)
          .andWhere('id', req.params.category_id)
          .whereNotIn('name', protectedCategories)
          .update({
            name: req.body.name,
            api: req.body.api,
            user_id: req.body.user_id,
          })
          .then((results) => {
            res.status(200).redirect('/');
          });
      })
      .catch((err) => {
        res.status(401).send('user not logged in');
      });
  });
  // delete current category
  router.post('/:category_id/delete', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('categories')
          .where('user_id', temp_user_id[0].id)
          .andWhere('id', req.params.category_id)
          .del()
          .then((results) => {
            res.status(200).redirect('/');
          });
      })
      .catch((err) => {
        res.status(401).send('user not logged in');
      });
  });

  return router;
}
