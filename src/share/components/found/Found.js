import React from 'react';
import styles from './Found.module.scss';

const Found = ({totalElements}) => {
  return <div className={styles['found']}>Found {totalElements} elements</div>;
};

export default Found;