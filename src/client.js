// imports from vendor
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import ContextHolder from './components/ContextHolder';
import history from './utils/history';
import configureStore from './store/configureStore';

const store = configureStore(window.APP_STATE, { history });

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  // Initialize a new Redux store
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store
};

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  onRenderComplete = function renderComplete(location) {
    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    // Restore the scroll position if it was saved into the state
    // or scroll to the given #hash anchor
    // or scroll to top of the page
    window.scrollTo(scrollX, scrollY);

    // Google Analytics tracking. Don't send 'pageview' event after
    // the initial rendering, as it was already sent
    if (window.ga) {
      window.ga('send', 'pageview');
    }
  };
};

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);

let currentLocation = history.getCurrentLocation();
let routes = require('./routes').default;

// Re-render the app when window.location changes
async function onLocationChange(location) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (history.action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  try {
    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    // key={Math.random()} - quick fix of HMR. TODO: try to figure out what is going on here.
    // related issue: https://github.com/ReactTraining/react-router/issues/2704
    ReactDOM.render(
      <Provider store={store}>
        <ContextHolder context={context}>
          <Router key={Math.random()} history={history} routes={routes} />
        </ContextHolder>
      </Provider>,
      document.getElementById('app'),
      () => onRenderComplete(location)
    );
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      throw err;
    }

    // Avoid broken navigation in production mode by a full page reload on error
    console.error(err); // eslint-disable-line no-console
    window.location.reload();
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require('./routes').default; // eslint-disable-line global-require

    onLocationChange(currentLocation);
  });
}
