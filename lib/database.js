'use strict';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const createId = mongodb.ObjectID.createFromHexString;
const CONNECT_STRING = 'mongodb://heroku_app25604257:fuj6pcfg45ebk97mcj3r7ac5bm@ds053168.mongolab.com:53168/heroku_app25604257';

class DatabaseClient {
  constructor () {
    this._client = null;
    this._collection = null;
  }
  connect (callback) {
    MongoClient.connect(CONNECT_STRING, (err, client) => {
      if (err) {
        return callback(err);
      }

      this._client = client;
      this._collection = client.collection('address');
      callback();
    });
  }
  close () {
    this._client.close();
    this._client = null;
    this._collection = null;
  }
  create (address, callback) {
    const now = Date.now();

    address.created = now;
    address.updated = now;
    this._collection.insert(address, (err, results) => {
      if (err) {
        return callback(err);
      }

      // TODO: Validate that this exists first
      const created = results.ops[0];

      callback(null, created);
    });
  }
  retrieveAll (callback) {
    this._collection.find({}).toArray(callback);
  }
  retrieve (id, callback) {
    this._collection.findOne({
      _id: createId(id)
    }, callback);
  }
  update (id, updates, callback) {
    const now = Date.now();

    updates.updated = now;
    this._collection.update({
      _id: createId(id)
    }, {
      $set: updates
    }, (err, results) => {
      if (err) {
        return callback(err);
      }

      const data = {
        numberUpdated: results.result.n,
        updated: now
      };

      callback(null, data);
    });
  }
  delete (id, callback) {
    this._collection.remove({
      _id: createId(id)
    }, (err, results) => {
      if (err) {
        return callback(err);
      }

      const data = { numberRemoved: results.result.n };

      callback(null, data);
    });
  }
}

module.exports = DatabaseClient;
