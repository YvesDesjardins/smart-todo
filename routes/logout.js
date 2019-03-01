'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    // deletes user's current logged in cookie and redirect
    req.session = null;
    res.redirect('/');
  });

  return router;
}
