'use strict';
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const address = require('./addressRouter');
const DatabaseClient = require('./database');

module.exports.init = (callback) => {
  const app = express();
  const db = new DatabaseClient();

  db.connect((err) => {
    if (err) {
      return callback(err);
    }

    app.disable('x-powered-by');
    app.use(favicon(path.join(process.cwd(), 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static', express.static('public'));

    // Make the database connection accessible to the rest of the route
    app.use((req, res, next) => {
      res.locals.db = db;
      next();
    });

    app.use('/address', address);
    // SPA, anything that isn't handled, send the HTML
    app.get('*', (req, res) => {
      res.sendFile('index.html', {
        root: 'public'
      });
    });
    callback(null, app);
  });
};
