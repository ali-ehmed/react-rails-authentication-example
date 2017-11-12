import axios from 'axios';
import { checkAuthenticationStatus } from './UserAction';
import { showFlashMessage } from './FlashMessagesAction';

import {
  FETCH_LISTINGS_STARTED,
  FETCH_LISTINGS_SUCCESS,
} from './Types';

export const listingsFetchDataStart = () => {
  return {
    type: FETCH_LISTINGS_STARTED
  };
};

export const listingsFetchDataSuccess = (listings) => {
  return {
    type: FETCH_LISTINGS_SUCCESS,
    data: listings.data
  };
};

export const fetchListingData = (action, params = {}) => {
  return (dispatch, getState) => {
    dispatch(listingsFetchDataStart());
    let url = '/api/' + action;
    const request = axios.get(url, {
      headers: {
        'Authorization': getState().user.data.auth_token
      },
      params: params
    });
    request.then((response) => {
      dispatch(checkAuthenticationStatus(response)).then((response) => {
        if (response.data.status === 200) {
          dispatch(listingsFetchDataSuccess(response.data));
        } else {
          dispatch(showFlashMessage('alert', '', response.data.message));
        }
      });
    }).catch((error) => {
      dispatch(showFlashMessage('alert', '', error.response.data.error));
    });
  };
};