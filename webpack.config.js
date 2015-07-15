'use strict';

var Path = require('path');
var Webpack = require('webpack');
var Minimist = require('minimist');

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
    main: ['./client/main.js']
  },
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  module: {
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
    }]
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    modulesDirectories: ['node_modules']
  },
  plugins: plugs
};
