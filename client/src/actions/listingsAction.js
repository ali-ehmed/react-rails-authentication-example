import axios from 'axios';
import { checkAuthenticationStatus } from './UserAction';
import { showFlashMessage } from './FlashMessageAction';

import {
  FETCH_LISTINGS_STARTED,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE
} from './Types';

export const listingsFetchDataStart = () => {
  return {
    type: FETCH_LISTINGS_STARTED
  };
};

export const listingsFetchDataSuccess = (listings) => {
  return {
    type: FETCH_LISTINGS_SUCCESS,
    listings: listings
  };
};

export const listingsFetchDataFailure = () => {
  return {
    type: FETCH_LISTINGS_FAILURE
  };
};

export const fetchListings = () => {
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
          dispatch(showFlashMessage('alert', '', response.data.message));
        }
      });
    }).catch(() => {
      dispatch(listingsFetchDataFailure());
    });
  };
};