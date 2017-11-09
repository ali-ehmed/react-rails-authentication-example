import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import history from './history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

// Reducers
import Reducers from './reducers';

// Stylesheets
import './assets/stylesheets/index.css';
import 'bootstrap/dist/css/bootstrap.css';

// Components
import App from './components/App';

import { verifyServerAuthentication } from './actions/user';

import registerServiceWorker from './registerServiceWorker';

// Build the middleware for intercepting and dispatching navigation actions
const routesMiddleware = routerMiddleware(history);

const store = createStore(
  connectRouter(history)(Reducers),
  compose(applyMiddleware(thunk, routesMiddleware))
);

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
