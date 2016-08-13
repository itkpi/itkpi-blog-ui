import path from 'path';

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const env = process.env.NODE_ENV;

const config = new Map();

const dirRoot = path.join(__dirname, '..');
config.set('dir_root', dirRoot);
config.set('dir_src', path.join(dirRoot, 'src'));
config.set('dir_dist', path.join(dirRoot, 'static', 'dist'));

config.set('global', {
  CLIENT: false,
  SERVER: true,
  DISABLE_SSR: false, // <-- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
  DEVELOPMENT: env !== 'production'
});

export default config;
