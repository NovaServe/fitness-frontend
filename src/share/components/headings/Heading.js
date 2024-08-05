import React from 'react';
import styles from './Heading.module.scss';

const Heading = ({ text, isCentered }) => {
  const heading = `${styles['heading']} ${isCentered ? styles['heading--centered'] : ''}`;

  return (<div className={heading}>{text}</div>);
};

export default Heading;