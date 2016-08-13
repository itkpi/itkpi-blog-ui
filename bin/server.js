#!/usr/bin/env node

require('../server.babel'); // babel registration (runtime transpilation for node)
const config = require('../config/config');

/**
 * Define isomorphic constants.
 */
const globalConstants = config.get('global');
global.__CLIENT__ = globalConstants.CLIENT;
global.__SERVER__ = globalConstants.SERVER;
global.__DISABLE_SSR__ = globalConstants.DISABLE_SSR;
global.__DEVELOPMENT__ = globalConstants.DEVELOPMENT;

if (__DEVELOPMENT__) {
  if (!require('piping')({ hook: true })) { return; }
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const WITConfig = require('../webpack/webpack-isomorphic-tools');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(WITConfig)
  .development(__DEVELOPMENT__)
  .server(config.get('dir_root'), () => { require('../src/server'); });
