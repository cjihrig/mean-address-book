var context = require.context('./spec', true, /.+\.js/);
context.keys().forEach(context);
