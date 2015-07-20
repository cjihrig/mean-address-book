'use strict';
var Code = require('code');
var Lab = require('lab');
var Wreck = require('wreck');
var Lib = require('../lib');
var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;

Code.settings.truncateMessages = false;

var address = {
  firstName: 'John',
  lastName: 'Johnson',
  addressLineOne: '123 Abc Street',
  addressLineTwo: 'Suite 100',
  city: 'Pittsburgh',
  state: 'PA',
  zip: '15234',
  home: true
};

var address2 = {
  firstName: 'Sue',
  lastName: 'Susanson',
  addressLineOne: '789 Xyz Avenue',
  addressLineTwo: '',
  city: 'San Diego',
  state: 'CA',
  zip: '92118',
  home: false
};

function create (url, address, callback) {
  Wreck.post(url, {
    headers: { 'Content-Type': 'application/json' },
    json: 'force',
    payload: JSON.stringify(address)
  }, callback);
}

function update (url, address, callback) {
  Wreck.put(url, {
    headers: { 'Content-Type': 'application/json' },
    json: 'force',
    payload: JSON.stringify(address)
  }, callback);
}

function get (url, callback) {
  Wreck.get(url, {
    json: 'force'
  }, callback);
}

function remove (url, callback) {
  Wreck.delete(url, {
    json: 'force'
  }, callback);
}

describe('API', function () {
  var server;
  var url;

  lab.beforeEach(function (done) {
    Lib.init(function (err, app) {
      if (err) {
        return done(err);
      }

      server = app.listen(0, function () {
        var port = server.address().port;

        url = 'http://localhost:' + port;
        done();
      });
    });
  });

  lab.afterEach(function (done) {
    server.close();
    server = null;
    done();
  });

  describe('POST /address', function () {
    it('creates a new address', function (done) {
      create(url + '/address', address, function (err, response, body) {
        expect(err).to.not.exist();
        expect(response.statusCode).to.equal(201);
        expect(body._id).to.be.a.string();
        expect(body.created).to.be.a.number();
        expect(body.updated).to.be.a.number();
        expect(body.created).to.equal(body.updated);
        delete body._id;
        delete body.created;
        delete body.updated;
        expect(body).to.deep.equal(address);
        done();
      });
    });
  });

  describe('GET /address', function () {
    it('retrieves all saved addresses', function (done) {
      var resource = url + '/address';

      create(resource, address, function (err, response, created) {
        expect(err).to.not.exist();
        expect(response.statusCode).to.equal(201);

        create(resource, address2, function (err, response, created2) {
          expect(err).to.not.exist();
          expect(response.statusCode).to.equal(201);

          get(resource, function (err, response, body) {
            expect(err).to.not.exist();
            expect(response.statusCode).to.equal(200);
            expect(body.addresses).to.be.an.array();

            // Verify that the two addresses we created are in the system
            expect(body.addresses.some(function (addr) {
              return addr._id === created._id;
            })).to.equal(true);

            expect(body.addresses.some(function (addr) {
              return addr._id === created2._id;
            })).to.equal(true);

            done();
          });
        });
      });
    });
  });

  describe('GET /address/:id', function () {
    it('retrieves a single address', function (done) {
      create(url + '/address', address, function (err, response, created) {
        expect(err).to.not.exist();
        expect(response.statusCode).to.equal(201);

        var resource = url + response.headers.location;

        get(resource, function (err, response, body) {
          expect(err).to.not.exist();
          expect(response.statusCode).to.equal(200);
          expect(body).to.deep.equal(created);
          done();
        });
      });
    });
  });

  describe('PUT /address/:id', function () {
    it('updates an existing address', function (done) {
      create(url + '/address', address, function (err, response, created) {
        expect(err).to.not.exist();
        expect(response.statusCode).to.equal(201);

        var resource = url + response.headers.location;
        var createdTime = created.updated;

        update(resource, address2, function (err, response, body) {
          expect(err).to.not.exist();
          expect(response.statusCode).to.equal(200);

          get(resource, function (err, response, body) {
            expect(err).to.not.exist();
            expect(response.statusCode).to.equal(200);
            expect(body.updated).to.not.equal(createdTime);
            delete body._id;
            delete body.created;
            delete body.updated;
            expect(body).to.deep.equal(address2);
            done();
          });
        });
      });
    });
  });

  describe('DELETE /address/:id', function () {
    it('deletes an existing address', function (done) {
      create(url + '/address', address, function (err, response, created) {
        expect(err).to.not.exist();
        expect(response.statusCode).to.equal(201);

        var resource = url + response.headers.location;

        remove(resource, function (err, response, body) {
          expect(err).to.not.exist();
          expect(response.statusCode).to.equal(200);
          expect(body.numberRemoved).to.equal(1);
          get(resource, function (err, response, body) {
            expect(err).to.not.exist();
            expect(response.statusCode).to.equal(404);
            done();
          });
        });
      });
    });
  });
});
