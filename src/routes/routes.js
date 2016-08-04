// import from vendors
import React from 'react';
import { IndexRoute, Route } from 'react-router';

// import from containers
import {
  Home,
  NotFound,
} from 'containers';

import AppLayout from 'layouts/AppLayout';
import routeFactories from './routeFactories';

// import from components
import {
  RightSidebar,
  Ad,
  Search
} from '../components';

// import from utils
import { createComponent } from 'utils/component';

const rightSidebar = (props = { components: [Search, Ad] }) => createComponent(RightSidebar, props);

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path={routeFactories.indexRoute()} component={AppLayout}>
      <IndexRoute
        components={{
          center: Home,
          right: rightSidebar()
        }}
      />

      { /* Routes */ }

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
