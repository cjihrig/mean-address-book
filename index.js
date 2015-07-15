'use strict';
var lib = require('./lib');

lib.init(function(err, app) {
  if (err) {
    console.error('Could not connect to database');
    process.exit(1);
  }

  var server = app.listen(3000, function() {
    var address = server.address();
    var host = address.address;
    var port = address.port;

    console.log('Server listening at http://%s:%s', host, port);
  });
});
