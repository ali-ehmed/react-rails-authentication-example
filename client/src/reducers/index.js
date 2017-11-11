import { combineReducers } from 'redux';

import user from './userReducer';
import listings from './listingsReducer';
import flashMessage from './flashMessageReducer';

const rootReducer = combineReducers({
  user,
  listings,
  flash: flashMessage
});


export default rootReducer;
