import {deleteUserDataFromLocalStorage, getRoleFromLocalStorage} from './util';
import {INVALID_CREDENTIALS, LOGOUT_FAILED, LOGOUT_SUCCESSFUL} from './authMessages';
import {SUCCESS, WARNING} from '../../share/components/alert/messages';
import {clearGlobalMessage, globalError, loggedIn, setUserData} from '../../share/services/globalHandlers';
import {logout} from './authRequests';

export const handleLoginForm = async (
  formData,
  actionFunc,
  dispatch,
  navigate,
  setMessage,
  setMessageType) => {
  try {
    const res = await actionFunc(formData);
    if (res.status === 200) {
      loggedIn(dispatch);
      setUserData(dispatch, res.body);
      // dispatch({ type: 'LOGGED_IN' });
      // setUserDataToLocalStorage(res.body);
      // dispatch({
      //   type: 'SET_USER_DATA',
      //   payload: { fullName: res.body.fullName, role: res.body.role }
      // });
      // dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
      clearGlobalMessage(dispatch);
      if (getRoleFromLocalStorage() === 'ROLE_SUPERADMIN' || getRoleFromLocalStorage() === 'ROLE_ADMIN') {
        navigate('/admin/training');
      } else if (getRoleFromLocalStorage() === 'ROLE_CUSTOMER') {
        navigate('/customer/training');
      } else if (getRoleFromLocalStorage() === 'ROLE_INSTRUCTOR') {
        navigate('/instructor/training');
      }
    } else {
      setMessageType(WARNING);
      setMessage(INVALID_CREDENTIALS);
    }
  } catch (error) {
    setMessageType(WARNING);
    setMessage(error.message);
  }
};

export const handleLogout = async (dispatch, navigate) => {
  const res = await logout();
  if (res.status === 200) {
    deleteUserDataFromLocalStorage();
    dispatch({ type: 'LOGGED_OUT' });
    dispatch({
      type: 'SET_GLOBAL_MESSAGE',
      payload: { message: LOGOUT_SUCCESSFUL, messageType: SUCCESS }
    });
    navigate('/login');
  } else {
    globalError(dispatch, LOGOUT_FAILED);
    // dispatch({
    //   type: 'SET_GLOBAL_MESSAGE',
    //   payload: { message: LOGOUT_FAILED, messageType: WARNING }
    // });
  }
};