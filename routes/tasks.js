'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  // returns all current tasks for user
  router.get('/:category/tasks', (req, res) => {
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
  });

  // create new task
  router.post('/:category/tasks/:task', (req, res) => {
    knex('tasks')
      .insert({
        name: req.params.task,
        completed: false,
        category_id: temp_category_id[0].id
      })
      .then();

    res.status(200).redirect('/');
  });
  // edit existing task name
  router.post('/:category/tasks/:task/edit', (req, res) => {
    knex('tasks')
      .where('category_id', temp_category_id[0].id)
      .andWhere('name', req.params.task)
      .update({
        name: req.body.name,
        completed: req.body.completed,
        category_id: req.body.category_id,
      });
    res.status(200).redirect('/');
  });
  // delete current task
  router.post('/:category/tasks/:task/delete', (req, res) => {
    knex('tasks')
      .where('category_id', temp_category_id[0].id)
      .andWhere('name', req.params.task)
      .del()
      .then()
    res.status(200).redirect('/');
  });

  return router;
}
