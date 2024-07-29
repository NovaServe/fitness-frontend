import React from 'react';
import {SUCCESS} from './messages';
import styles from './Alert.module.scss';

function Alert ({ message, messageType }) {
  return (
    <div className={`${styles.alert} ${messageType === SUCCESS ? styles['alert--success'] : styles['alert--warning']}`}>
      {message}
    </div>
  );
}

export default Alert;