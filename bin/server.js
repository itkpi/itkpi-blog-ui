#!/usr/bin/env node

require('../server.babel'); // babel registration (runtime transpilation for node)
const config = require('../config/config');

/**
 * Define isomorphic constants.
 */
const globalConfig = config.get('global');
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // <-- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = globalConfig.DEVELOPMENT;

// webpack isomorphic tools
const WITPath = `${config.get('dirs').webpack}/webpack-isomorphic-tools`;
const WITTools = require(WITPath).getTools();

global.webpackIsomorphicTools = WITTools
  .development(globalConfig.DEVELOPMENT)
  .server(config.get('dirs').root, () => {
    require(`${config.get('dirs').src}/server`);
  });
