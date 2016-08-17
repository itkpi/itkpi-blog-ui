const path = require('path');

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const env = process.env.NODE_ENV;

const config = new Map();

const dirRoot = path.join(__dirname, '..');
config.set('dirs', {
  root: dirRoot,
  src: path.join(dirRoot, 'src'),
  dist: path.join(dirRoot, 'static', 'dist'),
  webpack: path.join(dirRoot, 'webpack')
});

config.set('global', {
  DEVELOPMENT: env !== 'production'
});

const devHost = process.env.HOST || 'localhost';
const devPort = (Number(process.env.PORT) + 1) || 3001;
const dirSrc = config.get('dirs').src;
config.set('webpack', {
  devHost,
  devPort,
  devPath: `http://${devHost}:${devPort}`,
  alias: {
    components: path.resolve(dirSrc, 'components'),
    constants: path.resolve(dirSrc, 'constants'),
    containers: path.resolve(dirSrc, 'containers'),
    helpers: path.resolve(dirSrc, 'helpers'),
    layouts: path.resolve(dirSrc, 'layouts'),
    reducers: path.resolve(dirSrc, 'reducers'),
    routes: path.resolve(dirSrc, 'routes'),
    styles: path.resolve(dirSrc, 'styles'),
    utils: path.resolve(dirSrc, 'utils')
  }
});

module.exports = config;
