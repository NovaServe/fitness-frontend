import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../services/requests';
import {handleGenericFormSubmission} from '../../share/components/form/formSubmission.js';
import {handleTokenValidation} from '../../auth/services/tokenValidation';
import {getInputs} from '../services/createUserInputs.js';
import GenericForm from '../../share/components/form/GenericForm.js';
import TabTitle from '../../share/components/TabTitle.js';
import Heading from '../../share/components/headings/Heading';
import {USER_CREATED} from '../services/messages';
import Alert from '../../share/components/alert/Alert';

const CreateUser = ({ globalMessage }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const $fetch = async () => {
      await handleTokenValidation(dispatch, setMessage, navigate);
    };
    $fetch();
  }, []);

  const onSubmit = async (formData) => {
    await handleGenericFormSubmission(
      formData,
      createUser,
      dispatch,
      navigate,
      setMessage,
      setMessageType,
      USER_CREATED
    );
  };

  const onClear = () => {
    setMessage('');
    setMessageType('');
  };

  return (<>
    <TabTitle title='Add user' />
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
    <Alert message={message} messageType={messageType} />
    <Heading text="Add user profile" />
    <GenericForm inputs={getInputs()} onSubmit={onSubmit} onClear={onClear} />
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(CreateUser);