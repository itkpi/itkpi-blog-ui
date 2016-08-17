const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const express = require('express');

const config = require('../src/config');

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const webpackConfig = require('./config/dev.config.js');

const devServerOptions = {
  quiet       : true, // don’t output anything to the console
  noInfo      : true, // suppress boring information
  hot         : false, // adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
  inline      : true, // also adds the webpack/hot/dev-server entry

  // You can use it in two modes:
  // watch mode (default): The compiler recompiles on file change.
  // lazy mode: The compiler compiles on every request to the entry point.
  lazy        : false,

  // network path for static files: fetch all statics from webpack development server
  publicPath  : webpackConfig.output.publicPath,

  headers     : { 'Access-Control-Allow-Origin': '*' },
  stats       : { colors: true }
};

const devServer = new express();
const compiler = webpack(webpackConfig);
devServer.use(webpackDevMiddleware(compiler, devServerOptions));
devServer.use(webpackHotMiddleware(compiler));

devServer.listen(port, (error) => {
  if (error) {
    console.log(error.stack || error);
    throw error;
  }

  console.info('==> 🚧  Webpack development server listening on port %s', port);
});
