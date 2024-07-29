import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUserDataFromLocalStorage } from '../services/util';
import { logout } from '../services/requests';
import { LOGOUT_SUCCESSFUL, LOGOUT_FAILED } from '../services/messages';
import {SUCCESS, WARNING} from '../../share/components/alert/messages';

function Logout () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const requestAPI = async () => {
      const response = await logout();
      if (response.status === 200) {
        deleteUserDataFromLocalStorage();
        dispatch({ type: 'LOGGED_OUT' });
        dispatch({ 
          type: 'SET_GLOBAL_MESSAGE', 
          payload: { message: LOGOUT_SUCCESSFUL, messageType: SUCCESS } 
        });
        navigate('/login');
      } else {
        dispatch({ 
          type: 'SET_GLOBAL_MESSAGE', 
          payload: { message: LOGOUT_FAILED, messageType: WARNING } 
        });
      }
    };
    requestAPI();
  }, []);
}

export default Logout;