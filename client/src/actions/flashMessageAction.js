import {
  FLASH_MESSAGE_SHOW,
  FLASH_MESSAGE_HIDE
} from './Types';

export const showFlashMessage = (type, heading, message) => {
  return {
    type: FLASH_MESSAGE_SHOW,
    flash: {
      heading: heading,
      message: message,
      type: type
    }
  };
};

export const hideFlashMessage = () => {
  return {
    type: FLASH_MESSAGE_HIDE
  };
};