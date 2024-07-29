import React from 'react';
// import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Alert from '../../share/components/alert/Alert';
import Heading from '../../share/components/headings/Heading';
import TabTitle from '../../share/components/TabTitle';

const Training = ({ globalMessage }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [message, setMessage] = useState('');
  //
  // useEffect(() => {
  // }, []);

  return (<>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
    <TabTitle title='Training' />
    <Heading text='Training' />
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(Training);