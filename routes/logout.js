'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
  // deletes user's current logged in cookie and redirect
  router.post('/', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
}
