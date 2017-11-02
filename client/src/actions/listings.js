import {
  FETCH_LISTINGS_STARTED,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE
} from './types';

import axios from 'axios';

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
  return (dispatch) => {
    dispatch(listingsFetchDataStart());
    const request = axios.get('api/listings');
    request.then((response) => {
      dispatch(listingsFetchDataSuccess(response.data.listings));
    }).catch((response) => {
      dispatch(listingsFetchDataFailure(response));
    })
  }
}