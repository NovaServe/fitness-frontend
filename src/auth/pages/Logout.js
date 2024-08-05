import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {handleLogout} from '../services/authHandlers';

function Logout () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      await handleLogout(dispatch, navigate);
    };
    fetchApi();
    // const requestAPI = async () => {
    //   const response = await logout();
    //   if (response.status === 200) {
    //     deleteUserDataFromLocalStorage();
    //     dispatch({ type: 'LOGGED_OUT' });
    //     dispatch({
    //       type: 'SET_GLOBAL_MESSAGE',
    //       payload: { message: LOGOUT_SUCCESSFUL, messageType: SUCCESS }
    //     });
    //     navigate('/login');
    //   } else {
    //     dispatch({
    //       type: 'SET_GLOBAL_MESSAGE',
    //       payload: { message: LOGOUT_FAILED, messageType: WARNING }
    //     });
    //   }
    // };
    // requestAPI();
  }, []);
}

export default Logout;