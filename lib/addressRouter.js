'use strict';
const express = require('express');
const router = express.Router();

// Create a new address
router.post('/', (req, res, next) => {
  res.locals.db.create(req.body, (err, result) => {
    if (err) {
      return next(err);
    }

    res.location(`/address/${result._id}`);
    res.status(201);
    res.send(result);
  });
});

// Retrieve all existing addresses
router.get('/', (req, res, next) => {
  res.locals.db.retrieveAll((err, result) => {
    if (err) {
      return next(err);
    }

    // Do not send back an array only
    const data = {
      addresses: result
    };

    res.send(data);
  });
});

// Retrieve a single address
router.get('/:id', (req, res, next) => {
  res.locals.db.retrieve(req.params.id, (err, result) => {
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
router.put('/:id', (req, res, next) => {
  delete req.body._id;
  res.locals.db.update(req.params.id, req.body, (err, result) => {
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
router.delete('/:id', (req, res, next) => {
  res.locals.db.delete(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

module.exports = router;
