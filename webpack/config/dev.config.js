require('babel-polyfill');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = require('../../config/config');
const WITPlugin = require('../webpack-isomorphic-tools').getPlugin();

// Read and try to parse .babelrc file.
const babelrcFile = fs.readFileSync(`${config.get('dirs').root}/.babelrc`);
let babelrcObject = {};
try {
  babelrcObject = JSON.parse(babelrcFile);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

const babelrcObjectDev = babelrcObject.env && babelrcObject.env.development || {};

// Merge global and dev-only plugins
const devBabelPlugins = [
  ...(babelrcObject.plugins || []),
  ...(babelrcObjectDev.plugins || [])
];

// Plugins will be pushed later.
const babelLoaderQuery = Object.assign(
  {}, babelrcObjectDev, babelrcObject, { plugins: [] }
);
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server,
// and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// Search react-transform.
let reactTransform = null;
for (let i = 0; i < devBabelPlugins.length; ++i) {
  let plugin = devBabelPlugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

// Add react-transform if it doesn't exist.
if (!reactTransform) {
  reactTransform = ['react-transform', { transforms: [] }];
  devBabelPlugins.push(reactTransform);
}

// Add empty transforms for the react-transform if they don't exist.
if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign(
    {}, reactTransform[1], { transforms: [] }
  );
}

// Push react-transform-hmr.
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

// Finalize.
babelLoaderQuery.plugins.push(devBabelPlugins);

module.exports = {
  devtool: 'inline-source-map',
  context: config.get('dirs').root,
  entry: {
    main: [
      `webpack-hot-middleware/client?path=${config.get('webpack').devPath}/__webpack_hmr`,
      'webpack/hot/dev-server',
      `${config.get('dirs').src}/client`
    ]
  },
  output: {
    path: config.get('dirs').dist,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `${config.get('webpack').devPath}/dist/`
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'autoprefixer-loader?browsers=last 2 version',
          `sass-loader?outputStyle=expanded&sourceMap&includePaths[]=${config.get('dirs').src}`
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: WITPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx'],
    alias: config.get('webpack').alias
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    WITPlugin.development()
  ]
};
