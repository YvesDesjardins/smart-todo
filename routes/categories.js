'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // returns all current categories for user
  router.get('/', (req, res) => {
    knex('categories')
      .select('*')
      .where('user_id', temp_user_id[0].id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.status(401).send('user has no categories');
      });
  });

  // create new category
  router.post('/:category_id', (req, res) => {
    knex('categories')
      .insert({
        name: req.params.category_id,
        api: req.body.api,
        user_id: temp_user_id[0].id
      })
      .then();

    res.status(200).redirect('/');
  });
  // edit existing category name
  router.post('/:category_id/edit', (req, res) => {
    knex('categories')
      .where('user_id', temp_user_id[0].id)
      .andWhere('name', req.params.category_id)
      .update({
        name: req.body.name,
        api: req.body.api,
        user_id: req.body.user_id,
      })
      .then();

    res.status(200).redirect('/');
  });
  // delete current category
  router.post('/:category_id/delete', (req, res) => {
    knex('categories')
      .where('user_id', temp_user_id[0].id)
      .andWhere('name', req.params.category_id)
      .del()
      .then();

    res.status(200).redirect('/');
  });

  return router;
}
