import React from 'react';
import styles from './ValidationMessage.module.scss';

function ValidationMessage({ message }) {
  return (<div className={styles['validation-message']}>{message}</div>);
}

export default ValidationMessage;