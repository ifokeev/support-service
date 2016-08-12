import {
  trigger
} from 'redial';

import React from 'react';

import {
  render
} from 'react-dom';

import {
  applyRouterMiddleware,
  Router,
  browserHistory,
  match
} from 'react-router';

import {
  useScroll
} from 'react-router-scroll';

import {
  Provider,
  trackComponents,
  renderReporter
} from 'mobx-react';

import mobxstore from 'mobx-store';
import localstorage from './localStorage';

import routes from '../routes';

import {
  initialState as configInitialState
} from '../config';

import {
  ENV
} from '../../env';

// Render the app client-side to a given container element:
export default container => {
  trackComponents();

  if (ENV === 'development') {
    renderReporter.on(function(data) {
      console.log('------------');
      console.log('renderReporter: ');
      console.log(data);
      console.log('------------');
    });

  }
  // Your server rendered response needs to expose the state of the store, e.g.
  // <script>
  //   window.INITIAL_STATE = <%- require('serialize-javascript')(state)%>
  // </script>
  let initialState = configInitialState;
  if (window.INITIAL_STATE) {
    initialState = window.INITIAL_STATE;
  }

  // Set up mobx-store
  const store = mobxstore(initialState);

  function errorResponse(code, context = null, message = null) {
    return {
      context,
      error: {
        code,
        message
      }
    };
  };

  function triggerRedial(location) {
    return new Promise((resolve, reject) => {
      match({
        routes,
        location
      }, (error, redirectLocation, renderProps) => {

        if (redirectLocation) {
          reject(errorResponse(301, redirectLocation.pathname + redirectLocation.search));
        } else if (error) {
          reject(errorResponse(500, location, error.message));
        } else if (!renderProps) {
          reject(errorResponse(404, location, 'Not found'));
        }

        const {
          components
        } = renderProps;

        // Define locals to be provided to all lifecycle hooks:
        const locals = {
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,

          // Allow use mobx-store
          store
        };

        // Don't fetch data for initial route, server has already done the work:
        if (window.INITIAL_STATE) {
          // Delete initial data so that subsequent data fetches can occur:
          delete window.INITIAL_STATE;
        } else {
          // Fetch mandatory data dependencies for 2nd route change onwards:
          trigger('startLoading', components, locals)
            .then(() => trigger('fetch', components, locals))
            .then(() => trigger('stopLoading', components, locals));

        }

        trigger('defer', components, locals);

        resolve();
      });
    });
  }

  // Listen for route changes on the browser history instance:
  browserHistory.listen(location => {
    triggerRedial(location).catch((err) => console.log(err));
  });

  triggerRedial(window.location).catch((err) => console.log(err));

  require("../../static/styles/app.scss");

  // Render app with Redux and router context to container element:
  render((
    <Provider store={store}>
      <Router render={applyRouterMiddleware(useScroll())} history={browserHistory} routes={routes} />
    </Provider>
  ), container);
};
