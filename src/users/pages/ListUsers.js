import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { getTestMessage } from '../service/service';
// import { SESSION_EXPIRED } from '../../../auth/service/messages';
// import { WARNING } from '../../../share/alertMessage';
// import { deleteUserDataFromLocalStorage } from '../../../auth/service/util';
import Button from '../../share/Button';
import Alert from '../../share/Alert';

function ListUsers({ globalMessage }) {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [message, setMessage] = useState('');

  useEffect(() => {



    // const requestAPI = async() => {
    // const response = await getTestMessage();
    // if (response.status === 200) {
    //   dispatch({ type: 'LOGGED_IN' });
    //   setMessage(response.body.data);
    // } else if (response.status === 401) {
    //   deleteUserDataFromLocalStorage();
    //   dispatch({ type: 'LOGGED_OUT' });
    //   dispatch({
    //     type: 'SET_GLOBAL_MESSAGE',
    //     payload: { message: SESSION_EXPIRED, messageType: WARNING }
    //   });
    //   navigate('/');
    // } else {
    //   dispatch({
    //     type: 'SET_GLOBAL_MESSAGE',
    //     payload: { message: SESSION_EXPIRED, messageType: WARNING }
    //   });
    //   navigate('/');
    // }
    // };
    // requestAPI();
  }, []);

  return (<>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}

    <h2>Profiles</h2>
    <Button title="Add profile" link="/admin/users/add" />

   
  </>);
}

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(ListUsers);