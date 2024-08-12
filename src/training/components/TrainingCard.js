import React from 'react';
import styles from '../../share/components/card/Card.module.scss';
import Button from '../../share/components/button/Button';

const TrainingCard = ({card}) => {
  const {
    id,
    title,
    description,
    instructor,
    areas,
    intensity,
    level,
    type,
    trainingPlace,
    totalPlaces,
    freePlaces,
    createdAt,
    createdBy
  } = card;

  return (

    <div key={id} className={styles['card']}>
      <div className={styles['card__item']}>
        <strong>Title:</strong> {title}
      </div>
      <div className={styles['card__item']}>
        <strong>Description:</strong> {description}
      </div>
      <div className={styles['card__item']}>
        <strong>Instructor:</strong> {instructor.fullName}
      </div>
      {areas && areas.length > 0 && (
        <div className={styles['card__item']}>
          <strong>Areas:</strong> {areas.map(area => (
            <label key={area.name}>{area} </label>))}
        </div>)}
      <div className={styles['card__item']}>
        <strong>Intensity:</strong> {intensity}
      </div>
      <div className={styles['card__item']}>
        <strong>Level:</strong> {level}
      </div>
      <div className={styles['card__item']}>
        <strong>Type:</strong> {type}
      </div>
      <div className={styles['card__item']}>
        <strong>Training place:</strong> {trainingPlace}
      </div>
      <div className={styles['card__item']}>
        <strong>Total places:</strong> {totalPlaces}
      </div>
      <div className={styles['card__item']}>
        <strong>Free places:</strong> {freePlaces}
      </div>
      <div className={styles['card__item']}>
        <strong>Created at:</strong> {createdAt}
      </div>
      <div className={styles['card__item']}>
        <strong>Created by:</strong> {createdBy.role} {createdBy.fullName}
      </div>

      <br/>
      <Button title="Manage" link={`/admin/training/manage/${id}`}/>
    </div>
  );
};

export default TrainingCard;