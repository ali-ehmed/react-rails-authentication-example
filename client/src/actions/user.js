import axios from 'axios';

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
    const request = axios({
      method: 'post',
      url: '/api/users/sign_in',
      data: { user: params }
    });

    request.then((response) => {
      console.log(response.headers)
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(authenticationSuccess(response.data));

      router.history.push('/', {
        flash: {
          type: 'notice',
          message: 'You have signed in successfully.'
        }
      });
    }).catch((error) => {
      dispatch(authenticationFailure());
      router.history.push(router.location.pathname, {
        flash: {
          type: 'alert',
          message: error.response.data.error
        }
      });
    });
  }
}

export function signOut(router) {
  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch(destroyAuthentication());
    router.history.push(router.location.pathname, {
      flash: {
        type: 'notice',
        message: 'You have signed out successfully.'
      }
    });
  }
}