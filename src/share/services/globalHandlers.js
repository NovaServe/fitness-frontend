import {deleteUserDataFromLocalStorage, setUserDataToLocalStorage} from '../../auth/services/util';
import {SESSION_EXPIRED} from '../../auth/services/authMessages';
import {SUCCESS, WARNING} from '../components/alert/messages';

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