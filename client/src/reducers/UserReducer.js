import {
  USER_AUTH_IN_PROGRESS,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_LOGOUT_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE
} from '../actions/Types';

const initialState = {
  isFetching: true,
  isAuthenticated: false,
  data: {},
  flash: false,
  errorMessages: ''
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
        data: action.payload,
        errorMessages: ''
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
    case USER_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessages: action.errorMessages,
        isAuthenticated: true
      };
    default:
      return state;
  }
}