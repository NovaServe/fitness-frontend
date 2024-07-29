import { ERROR_OCCURED_STATUS, ERROR_OCCURED_MESSAGE } from '../../services/messages';
import { SESSION_EXPIRED } from '../../../auth/services/messages';
import {SUCCESS, WARNING} from '../alert/messages';
import { deleteUserDataFromLocalStorage } from '../../../auth/services/util';

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
    } else if (response.status === 401) {
      deleteUserDataFromLocalStorage();
      dispatch({ type: 'LOGGED_OUT' });
      dispatch({
        type: 'SET_GLOBAL_MESSAGE',
        payload: { message: SESSION_EXPIRED, messageType: WARNING }
      });
      navigate('/login');
    } else {
      setMessageType(WARNING);
      setMessage(ERROR_OCCURED_STATUS + response.status);
    }
  } catch (error) {
    setMessageType(WARNING);
    setMessage(ERROR_OCCURED_MESSAGE + error.message);
  }
};
