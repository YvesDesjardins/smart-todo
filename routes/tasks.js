'use strict';

const express = require('express');
const getCategoryID = require('../helpers/getCategoryID.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all current tasks for user
  router.get('/', (req, res) => {
    getCategoryID(knex, req.body.category_id, (temp_category_id => {
      knex('tasks')
        .select('*')
        .where('category_id', temp_category_id)
        .then((results) => {
          res.json(results);
        })
        .catch((err) => {
          throw err;
        });
    }));
  });

  // create new task
  router.post('/:task', (req, res) => {
    getCategoryID(knex, req.body.category_id, (temp_category_id => {
      knex('tasks')
        .insert({
          name: req.params.task,
          completed: req.body.completed,
          category_id: temp_category_id
        })
        .then();

      res.status(200).redirect('/');
    }));
  });
  // edit existing task name
  router.post('/:task/edit', (req, res) => {
    getCategoryID(knex, req.body.category_id, (temp_category_id => {
      knex('tasks')
        .where('category_id', temp_category_id)
        .andWhere('name', req.params.task)
        .update({
          name: req.body.name,
          completed: req.body.completed
        });
    }));

    res.status(200).redirect('/');
  });
  // delete current task
  router.post('/:task/delete', (req, res) => {
    getCategoryID(knex, req.body.category_id, (temp_category_id => {
      knex('tasks')
        .where('category_id', temp_category_id)
        .andWhere('name', req.params.task)
        .del()
        .then()
    }));

    res.status(200).redirect('/');
  });

  return router;
}
