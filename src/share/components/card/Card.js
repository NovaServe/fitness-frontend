import React from 'react';
import Button from '../button/Button';
import styles from './Card.module.scss';

const Card = ({ fields, button }) => {
  return (
    <div className={styles['card']}>
      {fields.map((field, index) => (
        <div key={index} className={styles['card__item']}>
          <strong>{field.label}:</strong> {field.value}
        </div>
      ))}
      <br />
      {button && <Button title={button.title} link={button.link} />}
    </div>
  );
};

export default Card;