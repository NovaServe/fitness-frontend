import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Back.module.scss';

const Back = ({ link }) => {
  return <Link className={styles['back']} to={link}>&lt; Back</Link>;
};

export default Back;