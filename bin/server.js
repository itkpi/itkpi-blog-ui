#!/usr/bin/env node

require('../server.babel'); // babel registration (runtime transpilation for node)

const config = require('../config/config')('server');
const globalConfig = config.get('global');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = globalConfig.CLIENT;
global.__SERVER__ = globalConfig.SERVER;
global.__DISABLE_SSR__ = globalConfig.DISABLE_SSR;
global.__DEVELOPMENT__ = globalConfig.DEVELOPMENT;

// webpack isomorphic tools
const WITPath = `${config.get('dirs').webpack}/webpack-isomorphic-tools`;
const WITTools = require(WITPath).getTools();

global.webpackIsomorphicTools = WITTools
  .development(globalConfig.DEVELOPMENT)
  .server(config.get('dirs').root, () => {
    require(`${config.get('dirs').src}/server`);
  });
