import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

function Button ({ title, link }) {
  return (
    <Link className={styles.btn} to={link}>{ title }</Link>
  );
}

export default Button;