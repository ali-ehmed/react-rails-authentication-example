import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { BrowserRouter as Router } from 'react-router-dom';

import Reducers from './reducers';

import './assets/stylesheets/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';


const store = createStore(
    Reducers,
    applyMiddleware(thunk)
);

// Uncomment this if you have authentication setup

// Check for user and update application state if required
// const authenticatedUser = localStorage.getItem('user');
// if (authenticatedUser) {
//   store.dispatch(authenticationSuccess(JSON.parse(authenticatedUser)));
// }

store.subscribe(() => {
  console.log(store.getState())
});

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
