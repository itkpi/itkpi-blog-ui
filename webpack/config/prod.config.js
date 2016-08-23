require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

const config = require('../../config/config')('client');
const globalConfig = config.get('global');
const WITPlugin = require('../webpack-isomorphic-tools').getPlugin();

module.exports = {
  devtool: 'source-map',
  context: config.get('dirs').root,
  entry: { main: ['./src/client.js'] },
  output: {
    path: config.get('dirs').dist,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel'] },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          [
            'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version',
            `sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=${config.get('dirs').src}`
          ].join('!')
        )
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: WITPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx'],
    alias: config.get('webpack').alias
  },
  plugins: [
    new CleanPlugin([config.get('dirs').dist], { root: config.get('dirs').root }),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __CLIENT__: globalConfig.CLIENT,
      __SERVER__: globalConfig.SERVER,
      __DEVELOPMENT__: false
    }),
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    WITPlugin
  ]
};
