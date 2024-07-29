import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Alert from '../../share/components/alert/Alert';
import Button from '../../share/components/button/Button';
import {handleTokenValidation} from '../../auth/services/tokenValidation';
import {useNavigate} from 'react-router-dom';
import Heading from '../../share/components/headings/Heading';

const ListUsers = ({ globalMessage }) => {
  const [message, setMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const $fetch = async () => {
      await handleTokenValidation(dispatch, setMessage, navigate);
    };
    $fetch();
  }, []);

  return (<>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
    <Alert message={message} messageType={messageType} />
    <Heading text="Profiles" />
    <Button title="Add profile" link="/admin/users/add" />
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(ListUsers);