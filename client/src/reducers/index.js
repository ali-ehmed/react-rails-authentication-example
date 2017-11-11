import { combineReducers } from 'redux';

import user from './user';
import listings from './listings';
import flashMessage from './flashMessage';

const rootReducer = combineReducers({
  user,
  listings,
  flash: flashMessage
});


export default rootReducer;
