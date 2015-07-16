'use strict';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var createId = mongodb.ObjectID.createFromHexString;
var CONNECT_STRING = 'mongodb://heroku_app25604257:fuj6pcfg45ebk97mcj3r7ac5bm@ds053168.mongolab.com:53168/heroku_app25604257';

function DatabaseClient() {
  this._client = null;
  this._collection = null;
}

module.exports = DatabaseClient;

DatabaseClient.prototype.connect = function(callback) {
  var self = this;

  MongoClient.connect(CONNECT_STRING, function(err, client) {
    if (err) {
      return callback(err);
    }

    self._client = client;
    self._collection = client.collection('address');
    callback();
  });
};

DatabaseClient.prototype.close = function() {
  this._client.close();
  this._client = null;
  this._collection = null;
};

DatabaseClient.prototype.create = function(address, callback) {
  // TODO: Validate the address
  this._collection.insert(address, function(err, results) {
    if (err) {
      return callback(err);
    }

    // TODO: Validate that this exists first
    var created = results.ops[0];

    callback(null, created);
  });
};

DatabaseClient.prototype.retrieveAll = function(callback) {
  this._collection.find({}).toArray(callback);
};

DatabaseClient.prototype.retrieve = function(id, callback) {
  this._collection.findOne({
    _id: createId(id)
  }, callback);
};

DatabaseClient.prototype.update = function(id, updates, callback) {
  this._collection.update({
    _id: createId(id)
  }, {
    $set: updates
  }, function(err, results) {
    if (err) {
      return callback(err);
    }

    var data = { numberUpdated: results.result.n };

    callback(null, data);
  });
};

DatabaseClient.prototype.delete = function(id, callback) {
  this._collection.remove({
    _id: createId(id)
  }, function(err, results) {
    if (err) {
      return callback(err);
    }

    var data = { numberRemoved: results.result.n };

    callback(null, data);
  });
};
