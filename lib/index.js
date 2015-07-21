'use strict';
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var address = require('./addressRouter');
var DatabaseClient = require('./database');

module.exports.init = function (callback) {
  var app = express();
  app.disable('x-powered-by');
  var db = new DatabaseClient();

  db.connect(function (err) {
    if (err) {
      return callback(err);
    }

    app.use(favicon(path.join(process.cwd(), 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static', express.static('public'));

    // Make the database connection accessible to the rest of the route
    app.use(function (req, res, next) {
      res.locals.db = db;
      next();
    });

    app.use('/address', address);
    // SPA, anything that isn't handled, send the HTML
    app.get('*', function (req, res) {
      res.sendFile('index.html', {
        root: 'public'
      });
    });
    callback(null, app);
  });
};
