import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authRequests.js';
import { handleLoginForm } from '../services/authHandlers.js';
import {handleTokenValidationHomeOrLogin} from '../services/tokenValidation';
import { getInputsLoginForm } from '../services/inputs/inputsLoginForm.js';
import TabTitle from '../../share/components/misc/TabTitle.js';
import Alert from '../../share/components/alert/Alert';
import GenericForm from '../../share/components/form/GenericForm';
import Heading from '../../share/components/headings/Heading';
import {clearGlobalMessage} from '../../share/services/globalHandlers';
import helpers from '../../share/styles/Helpers.module.scss';

const Login = ({ globalMessage }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      await handleTokenValidationHomeOrLogin(dispatch, navigate);
    };
    fetchApi();
  }, []);

  const onSubmit = async (formData) => {
    await handleLoginForm(formData, login, dispatch, navigate, setMessage, setMessageType);
  };

  const onClear = () => {
    setMessage('');
    setMessageType('');
    clearGlobalMessage(dispatch);
  };

  return (
    <div>
      <TabTitle title='Login' />
      <Heading text='Login' isCentered={true} />
      {globalMessage && globalMessage.body ?
        <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
      <Alert message={message} messageType={messageType} />
      <div className={helpers['center-container']}>
        <GenericForm inputs={getInputsLoginForm} onSubmit={onSubmit} onClear={onClear} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(Login);
