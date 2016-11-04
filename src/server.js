// import from vendors
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import PrettyError from 'pretty-error';
import Helmet from 'react-helmet';

// import from components
import Html from './components/Html';
import ContextHolder from './components/ContextHolder';
import App from './components/App';

// import from routes
import { Error as ErrorPageWithoutStyle } from './containers';
import errorPageStyle from './containers/Error/error.scss';
import routes from './routes';

import assets from './assets'; // eslint-disable-line import/no-unresolved, import/extensions
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './modules/runtime';
import { port } from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const store = configureStore({ }, {
      cookie: req.headers.cookie,
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    const css = new Set();
    const location = req.url;

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
    };

    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        return next(error);
      } else if (redirectLocation) {
        return res.redirect(redirectLocation.pathname + redirectLocation.search, '/');
      } else if (renderProps) {
        const helmet = Helmet.rewind();

        const headComponents = Object.values(helmet)
          .reduce((acc, property) => [...acc, property.toComponent()], [])
          .filter(array => array.length)
          .reduce((acc, array) => [...acc, ...array]);

        const content = ReactDOM.renderToString(
          <ContextHolder context={context}>
            <App>
              <RouterContext {...renderProps} />
            </App>
          </ContextHolder>
        );

        const data = {
          style: [...css].join(''),
          script: assets.main.js,
          state: context.store.getState(),
          // chunk: assets[route.chunk] && assets[route.chunk].js,
          head: headComponents,
        };

        const html = ReactDOM.renderToStaticMarkup(
          <Html {...data}>
            { content }
          </Html>
        );
        return res.status(200).send(`<!DOCTYPE html>\n${html}`);
      }

      return res.status(404).send('Not Found');
    });
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
