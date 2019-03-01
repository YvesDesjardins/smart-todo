'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all tasks for user in current category
  router.get('/:category_id/tasks', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('tasks')
          .select('*')
          .where('category_id', req.params.category_id)
          .andWhere('user_id', temp_user_id[0].id)
          .then((results) => {
            res.json(results);
          })
          .catch((err) => {
            console.log(err);
            res.status(401).send('category has no tasks');
          });
      })
      .catch((err) => {
        res.status(401).send('user not logged in');
      });
  });

  // create new task
  router.post('/:category_id/tasks/new', (req, res) => {
    if (req.session.userID) {
      knex('tasks')
        .insert({
          name: req.body.name,
          completed: false,
          category_id: req.params.category_id
        })
        .then();

      res.status(200).redirect('/');
    } else {
      res.status(401).send('user not logged in');
    }
  });
  // edit current task
  router.post('/:category_id/tasks/:task_id/edit', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex
          .from('tasks')
          // .join('categories', 'category_id', 'categories.id')
          .where('category_id', req.params.category_id)
          // .andWhere('categories.user_id', temp_user_id[0].id)
          .andWhere('id', req.params.task_id)
          .update({
            name: 'req.body.name',
            completed: req.body.completed,
            category_id: req.body.category_id,
          })
          .then();

        res.status(200).redirect('/');
      })
      .catch((err) => {
        res.status(401).send('user not logged in');
      });
  });
  // delete current task
  router.post('/:category_id/tasks/:task_id/delete', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('tasks')
          // .join('categories', 'category_id', 'categories.id')
          .where('category_id', req.params.category_id)
          // .andWhere('categories.user_id', temp_user_id[0].id)
          .andWhere('id', req.params.task_id)
          .del()
          .then()

        res.status(200).redirect('/');
      })
      .catch((err) => {
        res.status(401).send('user not logged in');
      });
  });

  return router;
}
