import {
  FLASH_MESSAGE_SHOW,
  FLASH_MESSAGE_HIDE
} from './Types';

import {
  ALERT_NOTIFIER,
  ALERT_MESSAGE
} from '../components/shared/FlashMessage';

export const showFlashMessage = (type, heading, message, alertType = ALERT_MESSAGE) => {
  return {
    type: FLASH_MESSAGE_SHOW,
    flash: {
      heading: heading,
      message: message,
      type: type
    },
    alertType: alertType
  };
};

export const hideFlashMessage = (alertType = ALERT_NOTIFIER) => {
  return {
    type: FLASH_MESSAGE_HIDE,
    alertType: alertType
  };
};