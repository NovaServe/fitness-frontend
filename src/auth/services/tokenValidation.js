import { validateToken } from './authRequests';
import {deleteUserDataFromLocalStorage, getRoleFromLocalStorage, setUserDataToLocalStorage} from './util';
import {SESSION_EXPIRED} from './authMessages';
import {WARNING} from '../../share/components/alert/messages';
import {ERROR_OCCURED_STATUS, SMTH_WENT_WRONG} from '../../share/services/globalMessages';

export const handleTokenValidation = async (dispatch, setMessage, navigate) => {
  try {
    const res = await validateToken();
    if (res.status === 200) {
      setUserDataToLocalStorage(res.body);
      dispatch({ type: 'LOGGED_IN' });
      setMessage(res.body.data);
    } else if (res.status === 401) {
      deleteUserDataFromLocalStorage();
      dispatch({ type: 'LOGGED_OUT' });
      dispatch({
        type: 'SET_GLOBAL_MESSAGE',
        payload: { message: SESSION_EXPIRED, messageType: WARNING }
      });
      navigate('/login');
    } else {
      dispatch({
        type: 'SET_GLOBAL_MESSAGE',
        payload: { message: ERROR_OCCURED_STATUS + res.status, messageType: WARNING }
      });
    }
  } catch (e) {
    deleteUserDataFromLocalStorage();
    dispatch({ type: 'LOGGED_OUT' });
    dispatch({
      type: 'SET_GLOBAL_MESSAGE',
      payload: { message: SMTH_WENT_WRONG, messageType: WARNING }
    });
    navigate('/login');
  }
};

export const handleTokenValidationHomeOrLogin = async (dispatch, navigate) => {
  try {
    const res = await validateToken();
    if (res.status === 200) {
      setUserDataToLocalStorage(res.body);
      dispatch({ type: 'LOGGED_IN' });
      dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
      const userRole = getRoleFromLocalStorage();
      const nav = {
        ROLE_SUPERADMIN: '/admin/trainings',
        ROLE_ADMIN: '/admin/trainings',
        ROLE_CUSTOMER: '/customer/trainings',
        ROLE_INSTRUCTOR: '/instructor/trainings'
      };
      navigate(nav[userRole]);
    } else if (res.status === 401) {
      deleteUserDataFromLocalStorage();
      dispatch({ type: 'LOGGED_OUT' });
      dispatch({
        type: 'SET_GLOBAL_MESSAGE',
        payload: { message: SESSION_EXPIRED, messageType: WARNING }
      });
      navigate('/login');
    } else {
      dispatch({
        type: 'SET_GLOBAL_MESSAGE',
        payload: { message: ERROR_OCCURED_STATUS + res.status, messageType: WARNING }
      });
    }
  } catch (e) {
    dispatch({
      type: 'SET_GLOBAL_MESSAGE',
      payload: { message: SMTH_WENT_WRONG, messageType: WARNING }
    });
  }
};