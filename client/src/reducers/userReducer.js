import {
  USER_AUTH_IN_PROGRESS,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_LOGOUT_SUCCESS
} from '../actions/types.js';

const initialState = {
  isFetching: true,
  isAuthenticated: false,
  data: {},
  flash: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case USER_AUTH_IN_PROGRESS:
      return {
        ...state,
        isFetching: true
      };
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        data: action.payload
      };
    case USER_AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case USER_AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}