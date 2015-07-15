'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var router = require('./router');
var DatabaseClient = require('./database');

module.exports.init = function(callback) {
  var app = express();
  var db = new DatabaseClient();

  db.connect(function(err) {
    if (err) {
      return callback(err);
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Make the database connection accessible to the rest of the route
    app.use(function(req, res, next) {
      res.locals.db = db;
      next();
    });

    app.use(router);
    callback(null, app);
  });
};
