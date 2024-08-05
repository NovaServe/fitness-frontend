import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../services/userRequests';
import {handleGenericFormSubmission} from '../../share/components/form/handleGenericFormSubmission.js';
import {handleTokenValidation} from '../../auth/services/tokenValidation';
import {getInputsCreateUserForm} from '../services/inputs/inputsCreateUserForm.js';
import GenericForm from '../../share/components/form/GenericForm.js';
import TabTitle from '../../share/components/misc/TabTitle.js';
import Heading from '../../share/components/headings/Heading';
import {USER_CREATED} from '../services/userMessages';
import Alert from '../../share/components/alert/Alert';
import Back from '../../share/components/back/Back';
import helpers from '../../share/styles/Helpers.module.scss';

const CreateUser = ({ globalMessage }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      await handleTokenValidation(dispatch, setMessage, navigate);
    };
    fetchApi();
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
    <TabTitle title='Add user'/>
    <Back link="/admin/profiles"/>

    <div className={helpers['center-container']}>
      {globalMessage && globalMessage.body ?
        <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType}/> : <></>}
      <Alert message={message} messageType={messageType}/>
      <Heading text="Add user profile"/>
      <GenericForm inputs={getInputsCreateUserForm()} onSubmit={onSubmit} onClear={onClear}/>
    </div>
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(CreateUser);