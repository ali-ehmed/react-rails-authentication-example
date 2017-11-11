import {
  FLASH_MESSAGE_SHOW,
  FLASH_MESSAGE_HIDE
} from '../actions/types.js';

import { FlashMessageType } from '../helpers/AppHelper';

const initialState = {
  visible: false,
  flashType: FlashMessageType()
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FLASH_MESSAGE_SHOW:
      let heading = '';
      if(action.flash.heading) {
        heading = '<h4 className="alert-heading">' + action.flash.heading + '</h4>';
      }
      return {
          ...state,
        visible: true,
        message: heading + action.flash.message,
        flashType: FlashMessageType(action.flash.type)
      };
    case FLASH_MESSAGE_HIDE:
      return {
        ...state,
        visible: false
      };
    default:
      return state;
  }
}