import { combineReducers } from 'redux';

import user from './UserReducer';
import listings from './ListingsReducer';
import flashMessage from './FlashMessageReducer';

const rootReducer = combineReducers({
  user,
  listings,
  flash: flashMessage
});


export default rootReducer;
