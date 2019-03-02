'use strict';

const express = require('express');
const router = express.Router();

// twilio
const accountSid = 'AC1322a15732f94a88fa72342412eefe40';
const authToken = '036c45a6e221859c0eca2af175f8c488';
const twilioNumber = '+16042566469';
const client = require('twilio')(accountSid, authToken);

module.exports = () => {
  // fun stuff with twilio
  router.post('/', (req, res) => {
    twil(req.query.message, req.query.number);
    res.status(200).send('sent to twilio');
  });

  return router;
}

function twil(message, sendToNum) {
  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: sendToNum
    })
    .then(message => console.log(message.sid));
}
