import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/requests.js';
import { handleLoginForm } from '../services/loginSubmission.js';
import {handleTokenValidationHomeOrLogin} from '../services/tokenValidation';
import { inputs } from '../services/loginInputs.js';
import TabTitle from '../../share/components/TabTitle.js';
import Alert from '../../share/components/alert/Alert';
import GenericForm from '../../share/components/form/GenericForm';

const Login = ({ globalMessage }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const $fetch = async () => {
      await handleTokenValidationHomeOrLogin(dispatch, navigate);
    };
    $fetch();
  }, []);

  const onSubmit = async (formData) => {
    await handleLoginForm(formData, login, dispatch, navigate, setMessage, setMessageType);
  };

  const onClear = () => {
    setMessage('');
    setMessageType('');
    dispatch({
      type: 'CLEAR_GLOBAL_MESSAGE',
      payload: { message: '', messageType: '' }
    });
  };

  return (
    <div>
      <TabTitle title='Login' />
      <h3 className='shared_heading'>Login</h3>
      {globalMessage && globalMessage.body ?
        <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
      <Alert message={message} messageType={messageType} />
      <GenericForm inputs={inputs} onSubmit={onSubmit} onClear={onClear} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(Login);
