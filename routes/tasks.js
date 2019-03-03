'use strict';

const express = require('express');
const getUserID = require('../helpers/getUserID.js');
const getTasksForUser = require('../helpers/getTasksForUser.js');
const checkUserTask = require('../helpers/checkUserTask.js');
const router = express.Router();

module.exports = (knex) => {

  // returns all tasks for user in current category
  router.get('/:category_id/tasks', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('tasks')
          .select('*')
          .whereIn('id', getTasksForUser(knex, req.params.category_id, temp_user_id[0].id))
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
        .then(() => {
          res.status(200).redirect('/');
        });
    } else {
      res.status(401).send('user not logged in');
    }
  });
  // edit current task
  router.post('/:category_id/tasks/:task_id/edit', (req, res) => {
    knex('categories').select('id').where('name', 'Completed')
      .then((completedID) => {
        const category_id = req.body.completed ? completedID[0].id : req.body.category_id;

        getUserID(knex, req.session.userID)
          .then((temp_user_id) => {
            knex
              .whereIn('id', checkUserTask(knex, req.params.category_id, temp_user_id[0].id, req.params.task_id))
              .from('tasks')
              .update({
                name: req.body.name,
                completed: req.body.completed,
                category_id: category_id,
              })
              .then(() => {
                res.status(200).redirect('/');
              })
              .catch((err) => {
                res.status(401).send('user unauthorized');
              });
          })
          .catch((err) => {
            res.status(401).send('user not logged in');
          });
      });
  });
  // delete current task
  router.post('/:category_id/tasks/:task_id/delete', (req, res) => {
    getUserID(knex, req.session.userID)
      .then((temp_user_id) => {
        knex('tasks')
          .whereIn('id', checkUserTask(knex, req.params.category_id, temp_user_id[0].id, req.params.task_id))
          .del()
          .then((results) => {
            res.status(200).redirect('/');
          })
          .catch((err) => {
            res.status(401).send('user unauthorized');
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send('user not logged in');
      });
  });

  return router;
}
