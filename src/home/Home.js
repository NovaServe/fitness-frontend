import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {handleTokenValidationHomeOrLogin} from '../auth/services/tokenValidation';
import Alert from '../share/components/alert/Alert';

const Home = ({ globalMessage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const $fetch = async () => {
      await handleTokenValidationHomeOrLogin(dispatch, navigate);
    };
    $fetch();
  }, []);

  return (<>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(Home);