'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var address = require('./addressRouter');
var DatabaseClient = require('./database');

module.exports.init = function (callback) {
  var app = express();
  var db = new DatabaseClient();

  db.connect(function (err) {
    if (err) {
      return callback(err);
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static', express.static('public'));

    // Make the database connection accessible to the rest of the route
    app.use(function (req, res, next) {
      res.locals.db = db;
      next();
    });

    // Give us a nice home page route
    app.get('/', function (req, res) {
      res.sendFile('index.html', {
        root: 'public'
      });
    });
    app.use('/address', address);
    callback(null, app);
  });
};
