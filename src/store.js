import { createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';

export default function(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [ createMiddleware(client), reduxRouterMiddleware ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__) {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(reducer, data);

  // if (__DEVELOPMENT__ && module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(require('./reducers'));
  //   });
  // }

  return store;
}
