import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  Home,
  NotFound,
} from '../containers';
import AppLayout from '../layouts/AppLayout';
import routeFactories from './routeFactories';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path={routeFactories.indexRoute()} component={AppLayout}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
