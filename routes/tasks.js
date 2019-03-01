'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  // returns all current tasks for user
  router.get('/:category_id/tasks', (req, res) => {
    knex('tasks')
      .select('*')
      .where('category_id', req.params.category_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send('category has no tasks');
      });
  });

  // create new task
  router.post('/:category_id/tasks/new', (req, res) => {
    knex('tasks')
      .insert({
        name: req.params.task_id,
        completed: false,
        category_id: req.params.category_id
      })
      .then();

    res.status(200).redirect('/');
  });
  // edit existing task name
  router.post('/:category_id/tasks/:task_id/edit', (req, res) => {
    knex('tasks')
      .where('category_id', req.params.category_id)
      .andWhere('id', req.params.task_id)
      .update({
        name: req.body.name,
        completed: req.body.completed,
        category_id: req.body.category_id,
      })
      .then();

    res.status(200).redirect('/');
  });
  // delete current task
  router.post('/:category_id/tasks/:task_id/delete', (req, res) => {
    knex('tasks')
      .where('category_id', req.params.category_id)
      .andWhere('id', req.params.task_id)
      .del()
      .then()

    res.status(200).redirect('/');
  });

  return router;
}
