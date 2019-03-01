'use strict';

const express = require('express');
const getCategoryID = require('../helpers/getCategoryID.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all current tasks for user
  router.get('/:category/tasks/tasks', (req, res) => {
    getCategoryID(knex, req.params.category)
      .then(temp_category_id => {
        knex('tasks')
          .select('*')
          .where('category_id', temp_category_id[0].id)
          .then((results) => {
            res.json(results);
          })
          .catch((err) => {
            console.log(err);
            res.status(401).send('category has no tasks');
          });
      })
      .catch((err) => {
        res.status(401).send('category does not exist');
      });
  });

  // create new task
  router.post('/:category/tasks/:task', (req, res) => {
    getCategoryID(knex, req.params.category)
      .then(temp_category_id => {
        knex('tasks')
          .insert({
            name: req.params.task,
            completed: false,
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
  router.post('/:category/tasks/:task/edit', (req, res) => {
    getCategoryID(knex, req.params.category)
      .then(temp_category_id => {
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
  router.post('/:category/tasks/:task/delete', (req, res) => {
    getCategoryID(knex, req.params.category)
      .then(temp_category_id => {
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
