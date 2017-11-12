import {
  FETCH_LISTINGS_STARTED,
  FETCH_LISTINGS_SUCCESS
} from '../actions/Types';

const initialState = {
  isFetching: false,
  data: []
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_LISTINGS_STARTED:
      return {
        ...state,
        data: [],
        isFetching: true
      };
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    default:
      return state;
  }
};