'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const validate = require('./middleware/validator.js');
const errors = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

// GLOBAL -> APP LEVEL MIDDLEWARE
app.use(express.json());
app.use(logger);

// /person ROUTE
app.get('/person', validate, (req, res) => {
  let name =req.query.name;
  res.status(200).json({ name });
})

// EX ROUTE SHOWN FOR THROWING ERROR
app.get('/bad-route', (req, res) => {
  throw new Error('you have entered error land and it is not safe here. Turn back while you can.');
});

// QUERY STRINGS -- "OLD WAY"
// app.get('/person', (req, res) => {
// res.send(`hello ${req.query.user}`);
// });

// REQUEST PARAMETERS -- "NEW WAY"
// app.get('/hello/:user', (req, res) => {
//  res.send(`hello ${req.params.user}`);
// });

app.use('*', notFound);
app.use(errors);

module.exports = {
  server:app,
  start: port => {
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    })
  }
}