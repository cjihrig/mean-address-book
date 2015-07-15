'use strict';
var express = require('express');
var router = express.Router();

module.exports = router;

// Create a new address
router.post('/address', function(req, res, next) {
  res.locals.db.create(req.body, function(err, result) {
    if (err) {
      return next(err);
    }

    res.location('/address/' + result._id);
    res.status(201);
    res.send(result);
  });
});

// Retrieve all existing addresses
router.get('/address', function(req, res, next) {
  res.locals.db.retrieveAll(function(err, result) {
    if (err) {
      return next(err);
    }

    // Do not send back an array only
    var data = {
      addresses: result
    };

    res.send(data);
  });
});

// Retrieve a single address
router.get('/address/:id', function(req, res, next) {
  res.locals.db.retrieve(req.params.id, function(err, result) {
    if (err) {
      return next(err);
    }

    if (result === null) {
      res.status(404);
    }

    res.send(result);
  });
});

// Update an existing address
router.put('/address/:id', function(req, res, next) {
  res.status(404);
  res.send(null);
});

// Delete an existing address
router.delete('/address/:id', function(req, res, next) {
  res.locals.db.delete(req.params.id, function(err, result) {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

// Give us a nice home page route
router.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: 'public'
  });
});
