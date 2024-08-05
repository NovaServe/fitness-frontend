import { ERROR_OCCURED_STATUS, ERROR_OCCURED_MESSAGE } from '../../services/globalMessages';
import {SUCCESS, WARNING} from '../alert/messages';
import {on401} from '../../services/globalHandlers';

export const handleGenericFormSubmission = async (
  formData,
  actionFunc,
  dispatch,
  navigate,
  setMessage,
  setMessageType,
  successMessage) => {
  try {
    const response = await actionFunc(formData);
    if (response.status === 201) {
      setMessageType(SUCCESS);
      setMessage(successMessage);
      return true;
    } else if (response.status === 401) {
      on401(dispatch, navigate);
      return false;
    } else {
      setMessageType(WARNING);
      setMessage(ERROR_OCCURED_STATUS + response.status);
      return false;
    }
  } catch (error) {
    setMessageType(WARNING);
    setMessage(ERROR_OCCURED_MESSAGE + error.message);
    return false;
  }
};
