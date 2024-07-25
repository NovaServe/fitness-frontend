import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NO_ACTIVE_SESSION } from '../auth/service/messages.js';
import { WARNING } from '../share/alertMessage';
import { validateToken } from '../auth/service/requests.js';
import { deleteUserDataFromLocalStorage, setUserDateToLocalStorage, getRoleFromLocalStorage } from '../auth/service/util';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestAPI = async() => {
      const response = await validateToken();
      if (response.status === 200) {
        setUserDateToLocalStorage(response.body);
        dispatch({ type: 'LOGGED_IN' });
        dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
        if (getRoleFromLocalStorage() === 'ROLE_SUPERADMIN' || getRoleFromLocalStorage() === 'ROLE_ADMIN') {
          navigate('/admin/training');
        } else if (getRoleFromLocalStorage() === 'ROLE_CUSTOMER') {
          navigate('/customer/training');
        } else if (getRoleFromLocalStorage() === 'ROLE_INSTRUCTOR') {
          navigate('/instructor/training');
        }
      } else {
        deleteUserDataFromLocalStorage();
        dispatch({
          type: 'SET_GLOBAL_MESSAGE',
          payload: { message: NO_ACTIVE_SESSION, messageType: WARNING }
        });
        navigate('/login');
      }
    };
    requestAPI();
  }, []);

  return (<></>);
}

export default Home;