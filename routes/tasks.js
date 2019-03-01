'use strict';

const express = require('express');
const getCategoryID = require('../helpers/getCategoryID.js');
const router = express.Router();

module.exports = (knex) => {
  // create new task
  router.post('/:task', (req, res) => {
    getCategoryID(knex, req.body.category_id).then(temp_category_id => {
        knex('tasks')
          .insert({
            name: req.params.task,
            completed: req.body.completed,
            category_id: temp_category_id[0].id
          })
          .then();

        res.status(200).redirect('/');
      })
      .catch((err) => {
        res.status(401).send('category does not exist');
      });
  });
  // edit existing task name
  router.post('/:task/edit', (req, res) => {
    getCategoryID(knex, req.body.category_id).then(temp_category_id => {
        knex('tasks')
          .where('category_id', temp_category_id[0].id)
          .andWhere('name', req.params.task)
          .update({
            name: req.body.name,
            completed: req.body.completed,
            category_id: req.body.category_id,
          });
        res.status(200).redirect('/');
      })
      .catch((err) => {
        res.status(401).send('category does not exist/ task does not exist');
      });
  });
  // delete current task
  router.post('/:task/delete', (req, res) => {
    getCategoryID(knex, req.body.category_id).then(temp_category_id => {
        knex('tasks')
          .where('category_id', temp_category_id[0].id)
          .andWhere('name', req.params.task)
          .del()
          .then()
        res.status(200).redirect('/');
      })
      .catch((err) => {
        res.status(401).send('category does not exist/ task does not exist');
      });
  });

  return router;
}
