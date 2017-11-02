import {
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_LOGOUT_SUCCESS
} from '../actions/types.js';

const initialState = {
  isAuthenticated: false,
  data: {}
};

export default function (state = initialState, action) {
  switch(action.type) {
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        data: action.payload
      };
    case USER_AUTH_FAILURE:
      return {
        ...state,
        data: {
          errorMessage: action.errorMessage
        }
      };
    case USER_AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}