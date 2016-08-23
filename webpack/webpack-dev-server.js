// import from vendor dependencies
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

// local configs
const config = require('../config/config')('client');
const webpackConfig = require('./config/dev.config.js');

const devServerOptions = {
  // don’t output anything to the console
  quiet: true,
  // suppress boring information
  noInfo: true,
  // adds the HotModuleReplacementPlugin and switch the server to hot mode.
  // Note: make sure you don’t add HotModuleReplacementPlugin twice
  hot: false,
  // also adds the webpack/hot/dev-server entry
  inline: true,

  // You can use it in two modes:
  // watch mode (default): The compiler recompiles on file change.
  // lazy mode: The compiler compiles on every request to the entry point.
  lazy: false,

  // network path for static files: fetch all statics from webpack development server
  publicPath: webpackConfig.output.publicPath,

  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const devServer = new express();
const compiler = webpack(webpackConfig);
devServer.use(webpackDevMiddleware(compiler, devServerOptions));
devServer.use(webpackHotMiddleware(compiler));

const port = config.get('webpack').devPort;
devServer.listen(port, (error) => {
  if (error) {
    console.log(error.stack || error);
    throw error;
  }

  console.info('==> 🚧  Webpack development server listening on port %s', port);
});
