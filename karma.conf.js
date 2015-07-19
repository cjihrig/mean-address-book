var Path = require('path');
var Node_Modules = Path.join(process.cwd(), 'node_modules');
var ngPath = Path.join(Node_Modules, 'angular', 'angular.js');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'must'],
    files: [
      ngPath,
      Path.join(Node_Modules, 'babel-core', 'browser-polyfill.min.js'),
      Path.join(Node_Modules, 'angular-mocks', 'angular-mocks.js'),
      Path.join(Node_Modules, 'angular-route', 'angular-route.js'),
      'client/test/test-context.js'
    ],
    preprocessors: {
      'client/test/test-context.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        noParse: [ngPath],
        loaders: [{
          test: /\.js$/,
          include: [
            Path.resolve(process.cwd(), 'client')
          ],
          exclude: 'node_modules',
          loader: 'babel?optional[]=runtime'
        }]
      },
      webpackMiddleware: {
        noInfo: true
      },
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
      }
    }
  });
};
