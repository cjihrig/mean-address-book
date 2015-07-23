'use strict';
const lib = require('./lib');

lib.init((err, app) => {
  if (err) {
    console.error('Could not connect to database');
    process.exit(1);
  }

  const server = app.listen(9001, () => {
    const address = server.address();
    const host = address.address;
    const port = address.port;

    console.log(`Server listening at http://${host}:${port}`);
  });
});
