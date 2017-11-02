import { combineReducers } from 'redux';

import user from './user';
import listings from './listings';

const rootReducer = combineReducers({
  user,
  listings
});


export default rootReducer;
