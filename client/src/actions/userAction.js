import axios from 'axios';
import { push } from 'react-router-redux';
import history from '../history';
import { getParams, isEmpty } from '../helpers/AppHelper';

import { showFlashMessage } from './FlashMessageAction';

import {
  USER_AUTH_IN_PROGRESS,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_LOGOUT_SUCCESS
} from './Types';


export const authenticating = () => {
  return {
    type: USER_AUTH_IN_PROGRESS
  };
};

export const authenticationSuccess = (payload) => {
  return {
    type: USER_AUTH_SUCCESS,
    payload
  };
};

export const authenticationFailure = () => {
  return {
    type: USER_AUTH_FAILURE
  };
};

export const destroyAuthentication = () => {
  return {
    type: USER_AUTH_LOGOUT_SUCCESS
  };
};

export const signUp = (params) => {
  return (dispatch) => {
    if (isEmpty(params)) {
      dispatch(authenticationFailure());
      dispatch(showFlashMessage('alert', 'Please Review Errors Below!', 'Fill out the fields'));
      return Promise.resolve();
    }

    axios({
      method: 'post',
      url: '/api/users',
      data: { user: params }
    }).then((response) => {
      if (response.data.status === 200) {
        response.data.user.auth_token = response.headers.authorization;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(push('/', {
          flash: {
            type: 'notice',
            title: 'Welcome!',
            message: 'You have successfully registered to our site.'
          }
        }));
        dispatch(authenticationSuccess(response.data.user));
      } else {
        console.log('Registration Error', response.data.errors);
        dispatch(authenticationFailure());
        dispatch(showFlashMessage('alert', 'Please Review Errors Below!', response.data.errors));
      }
    })
  };
};

export const signIn = (params) => {
  return (dispatch) => {
    const request = axios({
      method: 'post',
      url: '/api/users/sign_in',
      data: { user: params }
    });
    request.then((response) => {
      let redirectBackUrl = getParams(history.location.search);

      response.data.auth_token = response.headers.authorization;
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(authenticationSuccess(response.data));

      dispatch(push(redirectBackUrl.redirect || '/', {
        flash: {
          type: 'notice',
          message: 'You have signed in successfully.'
        }
      }));
    }).catch((error) => {
      dispatch(authenticationFailure());
      dispatch(showFlashMessage('alert', '', error.response.data.error));
    });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    const request = axios({
      method: 'delete',
      url: '/api/users/sign_out',
      headers: {
        'Authorization': getState().user.data.auth_token
      }
    });

    request.then((response) => {
      if(response.data.status === 200) {
        localStorage.removeItem('user');
        dispatch(destroyAuthentication());
        dispatch(showFlashMessage('notice', '', 'You have signed out successfully.'));
      } else {
        dispatch(showFlashMessage('notice', '', 'You are not signed in.'));
      }
    });
  };
};

export const checkAuthenticationStatus = (response) => {
  return (dispatch) => {
    if (response.data.status === 401) {
      dispatch(destroyAuthentication());
    } else {
      return Promise.resolve(response);
    }
  };
};

export const verifyServerAuthentication = () => {
  return (dispatch) => {
    const authenticatedUser = localStorage.getItem('user');
    if (authenticatedUser) {
      dispatch(authenticating());
      const request = axios({
        method: 'get',
        url: '/api/users/verify_authentication',
        headers: {
          'Authorization': JSON.parse(authenticatedUser).auth_token
        }
      });

      request.then((response) => {
        if(response.data.status === 200) {
          dispatch(authenticationSuccess(JSON.parse(authenticatedUser)));
        } else {
          localStorage.removeItem('user');
          dispatch(destroyAuthentication());
          dispatch(showFlashMessage('alert', '', 'Your session is expired. Please sign in again.'));
        }
      });
    } else {
      dispatch(destroyAuthentication());
    }

    return Promise.resolve();
  };
};
