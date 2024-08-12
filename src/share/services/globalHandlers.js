import {deleteUserDataFromLocalStorage, setUserDataToLocalStorage} from '../../auth/services/util';
import {SESSION_EXPIRED} from '../../auth/services/authMessages';
import {SUCCESS, WARNING} from '../components/alert/messages';
import {ERROR_OCCURED_MESSAGE, ERROR_OCCURED_STATUS} from './globalMessages';

export const globalError = (dispatch, message) => {
  dispatch({
    type: 'SET_GLOBAL_MESSAGE',
    payload: { message: message, messageType: WARNING }
  });
};

export const globalSuccess = (dispatch, message) => {
  dispatch({
    type: 'SET_GLOBAL_MESSAGE',
    payload: { message: message, messageType: SUCCESS }
  });
};

export const clearGlobalMessage = dispatch => {
  dispatch({
    type: 'CLEAR_GLOBAL_MESSAGE',
    payload: { message: '', messageType: '' }
  });
};

export const on401 = (dispatch, navigate) => {
  deleteUserDataFromLocalStorage();
  dispatch({ type: 'LOGGED_OUT' });
  dispatch({
    type: 'SET_GLOBAL_MESSAGE',
    payload: { message: SESSION_EXPIRED, messageType: WARNING }
  });
  navigate('/login');
};

export const loggedIn = dispatch => {
  dispatch({ type: 'LOGGED_IN' });
};

export const setUserData = (dispatch, userData) => {
  setUserDataToLocalStorage(userData);
  dispatch({
    type: 'SET_USER_DATA',
    payload: { fullName: userData.fullName, role: userData.role }
  });
};

export const handleGetEntitiesFlat = async (func, setEntities, setMessage, setMessageType, dispatch, navigate) => {
  try {
    const res = await func();
    if (res.status === 200) {
      setEntities(res.body);
    } else if (res.status === 401) {
      on401(dispatch, navigate);
    } else {
      setMessageType(WARNING);
      setMessage(ERROR_OCCURED_STATUS + res.status);
    }
  } catch (e) {
    setMessageType(WARNING);
    setMessage(ERROR_OCCURED_MESSAGE + e.message);
  }
};