import {
  trigger
} from 'redial';

import React from 'react';

import {
  renderToString
} from 'react-dom/server';

import {
  RouterContext,
  createMemoryHistory,
  match
} from 'react-router';

import mobxstore from 'mobx-store';

import {
  Provider
} from 'mobx-react';

import routes from '../routes';

import {
  initialState
} from '../config';

const store = mobxstore(initialState);

function getRootComponent(renderProps) {
  const state = store.contents();
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  return {
    html,
    state
  };
}

function errorResponse(code, context = null, message = null) {
  return {
    context,
    error: {
      code,
      message
    }
  };
};

function routing(req, res) {
  const history = createMemoryHistory(req.url);

  return new Promise((resolve, reject) => {
    match({
      routes,
      history
    }, (error, redirectLocation, renderProps) => {

      if (redirectLocation) {
        reject(errorResponse(301, redirectLocation.pathname + redirectLocation.search));
      } else if (error) {
        reject(errorResponse(500, location, error.message));
      } else if (!renderProps) {
        reject(errorResponse(404, location, 'Not found'));
      }
      
      // Get array of route components:
      const {
        components
      } = renderProps;

      // Define locals to be provided to all fetcher functions:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow use mobx-store
        store
      };

      trigger('fetch', components, locals)
        .then(() => {
          resolve(getRootComponent(renderProps));
        })
        .catch(reject);
    });
  });
}

export default routing;
