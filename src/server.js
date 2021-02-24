'use strict';

const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');
const errors = require('./error-handlers/500.js');
const notFound = require('./error-handlers/400.js');

// GLOBAL -> APP LEVEL MIDDLEWARE
app.use(express.json());
app.use(logger);

// QUERY STRINGS -- "OLD WAY"
// /person ROUTE
// URL EX: http://localhost300/hello?
app.get('/person', (req, res) => {
res.send(`hello ${req.query.user}`);
});

// EX ROUTE SHOWN FOR THROWING ERROR
app.get('/bad-route', (req, res) => {
  throw new Error('you have entered error land and it is not safe here. Turn back while you can.');
});

// REQUEST PARAMETERS -- "NEW WAY", BUT NOT BEING USED NOW
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