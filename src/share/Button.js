import React from 'react';
// import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

function Button({ title, link }) {
  return (
    <Link to={link}>{ title }</Link>
  );
}

export default Button;