import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTestMessage } from '../service/service';
import { SESSION_EXPIRED } from '../../../auth/service/messages';
import { WARNING } from '../../../share/alertMessage';
import { deleteUserDataFromLocalStorage } from '../../../auth/service/util';
import Alert from '../../../share/Alert';

function AdminTraining({ globalMessage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const requestAPI = async() => {
      const response = await getTestMessage();
      if (response.status === 200) {
        dispatch({ type: 'LOGGED_IN' });
        setMessage(response.body.data);
      } else if (response.status === 401) {
        deleteUserDataFromLocalStorage();
        dispatch({ type: 'LOGGED_OUT' });
        dispatch({
          type: 'SET_GLOBAL_MESSAGE',
          payload: { message: SESSION_EXPIRED, messageType: WARNING }
        });
        navigate('/');
      } else {
        dispatch({
          type: 'SET_GLOBAL_MESSAGE',
          payload: { message: SESSION_EXPIRED, messageType: WARNING }
        });
        navigate('/');
      }
    };
    requestAPI();
  }, []);

  return (<>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}

    <h3>{message}</h3>
    <Link to={'/logout'}>Logout</Link> | <Link to={'/'}>/</Link>
  </>);
}

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(AdminTraining);