import {
  FETCH_LISTINGS_STARTED,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE
} from '../actions/Types';

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_LISTINGS_STARTED:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        data: action.listings,
        isFetching: false
      };
    case FETCH_LISTINGS_FAILURE:
      return {
        ...state,
        data: action.error
      };
    default:
      return state;
  }
};