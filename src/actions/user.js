// import axios from 'axios';

import {
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_LOGOUT_SUCCESS
} from './types';

export function authenticationSuccess(payload) {
  return {
    type: USER_AUTH_SUCCESS,
    payload
  };
}

export function authenticationFailure(errorMessages) {
  return {
    type: USER_AUTH_FAILURE,
    errorMessages: errorMessages
  };
}

export function destroyAuthentication() {
  return {
    type: USER_AUTH_LOGOUT_SUCCESS
  };
}

export function signIn(params, router) {
  return (dispatch) => {
    if (params.email === 'aliahmed@example.com' && params.password === 'aliahmed') {
      const response = {
        id: 1,
        full_name: 'Ali Ahmed',
        email: 'aliahmed@example.com'
      };
      localStorage.setItem('user', JSON.stringify(response));
      dispatch(authenticationSuccess(response));
      router.history.push('/', {
        flash: {
          type: 'success',
          message: 'You have signed in successfully.'
        }
      });
    } else {
      dispatch(authenticationFailure());
      router.history.push(router.location.pathname, {
        flash: {
          type: 'danger',
          message: 'Invalid email or password.'
        }
      });
    }
  }
}

export function signOut(router) {
  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch(destroyAuthentication());
    router.history.push(router.location.pathname, {
      flash: {
        type: 'success',
        message: 'You have signed out successfully.'
      }
    });
  }
}