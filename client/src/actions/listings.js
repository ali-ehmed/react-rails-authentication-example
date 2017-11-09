import { push } from 'react-router-redux';
import axios from 'axios';
import { checkAuthenticationStatus } from './user';

import {
  FETCH_LISTINGS_STARTED,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE
} from './types';

export function listingsFetchDataStart() {
  return {
    type: FETCH_LISTINGS_STARTED
  };
}

export function listingsFetchDataSuccess(listings) {
  return {
    type: FETCH_LISTINGS_SUCCESS,
    listings: listings
  };
}

export function listingsFetchDataFailure(error) {
  return {
    type: FETCH_LISTINGS_FAILURE,
    error: error
  };
}

export function fetchListings() {
  return (dispatch, getState) => {
    dispatch(listingsFetchDataStart());
    const request = axios.get('api/listings', {
      headers: {
        'Authorization': getState().user.data.auth_token
      }
    });
    request.then((response) => {
      dispatch(checkAuthenticationStatus(response)).then((response) => {
        if (response.data.status === 200) {
          dispatch(listingsFetchDataSuccess(response.data.listings));
        } else {
          dispatch(push('/', {
            flash: {
              type: 'alert',
              message: response.data.message
            }
          }));
        }
      });
    }).catch((response) => {
      dispatch(listingsFetchDataFailure(response.data));
    });
  };
}