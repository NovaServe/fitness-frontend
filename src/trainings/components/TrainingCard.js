import React from 'react';
import styles from '../../share/components/card/Card.module.scss';
import Button from '../../share/components/button/Button';

const TrainingCard = ({training}) => {
  return (
    <div key={training.id} className={styles['card']}>
      <div className={styles['card__item']}>
        <strong>Title:</strong> {training.title}
      </div>
      <div className={styles['card__item']}>
        <strong>Description:</strong> {training.description}
      </div>
      <div className={styles['card__item']}>
        <strong>Instructor:</strong> {training.instructor.fullName}
      </div>
      {training.areas && training.areas.length > 0 && (
        <div className={styles['card__item']}>
          <strong>Areas:</strong> {training.areas.map(area => (
            <label key={area.name}>{area} </label>))}
        </div>)}
      <div className={styles['card__item']}>
        <strong>Intensity:</strong> {training.intensity}
      </div>
      <div className={styles['card__item']}>
        <strong>Level:</strong> {training.level}
      </div>
      <div className={styles['card__item']}>
        <strong>Type:</strong> {training.type}
      </div>
      <div className={styles['card__item']}>
        <strong>Location:</strong> {training.location}
      </div>
      <div className={styles['card__item']}>
        <strong>Total places:</strong> {training.totalPlaces}
      </div>
      <div className={styles['card__item']}>
        <strong>Free places:</strong> {training.freePlaces}
      </div>
      <div className={styles['card__item']}>
        <strong>Created at:</strong> {training.createdAt}
      </div>
      <div className={styles['card__item']}>
        <strong>Created by:</strong> {training.createdBy.role} {training.createdBy.fullName}
      </div>

      <br/>
      <Button title="Manage" link={`/admin/training/manage/${training.id}`}/>
    </div>
  );
};

export default TrainingCard;