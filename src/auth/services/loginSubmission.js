import { getRoleFromLocalStorage, setUserDataToLocalStorage } from './util';
import { INVALID_CREDENTIALS } from './messages';
import {WARNING} from '../../share/components/alert/messages';

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
      setUserDataToLocalStorage(res.body);
      dispatch({ type: 'LOGGED_IN' });
      dispatch({
        type: 'SET_USER_DATA',
        payload: { fullName: res.body.fullName, role: res.body.role }
      });
      dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
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
