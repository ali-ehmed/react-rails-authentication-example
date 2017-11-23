import {
  FLASH_MESSAGE_SHOW,
  FLASH_MESSAGE_HIDE
} from '../actions/Types.js';

import {
  ALERT_NOTIFIER
} from '../components/shared/FlashMessage';

import { FlashMessageType } from '../helpers/AppHelper';

const initialState = {
  visibleAlertMessage: false,
  visibleAlertNotifier: false,
  flashType: FlashMessageType()
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FLASH_MESSAGE_SHOW:

      if (action.alertType === ALERT_NOTIFIER) {
        return {
          ...state,
          visibleAlertNotifier: true,
          heading: action.flash.heading,
          message: action.flash.message,
          flashType: FlashMessageType(action.flash.type)
        };
      } else {
        let heading = '';
        if(action.flash.heading) {
          heading = '<h4 className="alert-heading">' + action.flash.heading + '</h4>';
        }
        return {
          ...state,
          visibleAlertMessage: true,
          message: heading + action.flash.message,
          flashType: FlashMessageType(action.flash.type)
        };
      }


    case FLASH_MESSAGE_HIDE:
      if (action.alertType === ALERT_NOTIFIER) {
        return {
          ...state,
          visibleAlertNotifier: false
        };
      } else {
        return {
          ...state,
          visibleAlertMessage: false
        };
      }

    default:
      return state;
  }
}