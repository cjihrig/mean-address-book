'use strict';
var express = require('express');
var router = express.Router();

// Create a new address
router.post('/', function (req, res, next) {
  res.locals.db.create(req.body, function (err, result) {
    if (err) {
      return next(err);
    }

    res.location('/address/' + result._id);
    res.status(201);
    res.send(result);
  });
});

// Retrieve all existing addresses
router.get('/', function (req, res, next) {
  res.locals.db.retrieveAll(function (err, result) {
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
router.get('/:id', function (req, res, next) {
  res.locals.db.retrieve(req.params.id, function (err, result) {
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
router.put('/:id', function (req, res, next) {
  delete req.body._id;
  res.locals.db.update(req.params.id, req.body, function (err, result) {
    if (err) {
      return next(err);
    }

    if (result.numberUpdated < 1) {
      res.status(404);
    }

    res.send(result);
  });
});

// Delete an existing address
router.delete('/:id', function (req, res, next) {
  res.locals.db.delete(req.params.id, function (err, result) {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

module.exports = router;
