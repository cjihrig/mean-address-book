'use strict';

var Path = require('path');
var Webpack = require('webpack');
var Minimist = require('minimist');

var ngPath = Path.join(process.cwd() + 'node_modules', 'angular');

var plugs = [
  new Webpack.optimize.DedupePlugin()
];
var args = Minimist(process.argv);

if (args.prod) {
  plugs.push(new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = {
  entry: {
    main: ['babel-core/polyfill', './client/main.js']
  },
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  module: {
    noParse: [ngPath],
    loaders: [{
      test: /\.js$/,
      include: [
        Path.resolve(process.cwd(), 'client')
      ],
      exclude: 'node_modules',
      loader: 'babel?optional[]=runtime'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.html$/,
      loader: 'html?attrs=false&minimize=true'
    }, {
      test: ngPath,
      loader: 'exports?angular'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.html'],
    modulesDirectories: ['node_modules']
  },
  plugins: plugs
};
