import React from 'react';
import TrainingCard from './TrainingCard';

const TrainingCards = ({cards}) => {
  return (<>
    {cards && cards.length > 0 &&
      cards.map((card, index) => (<TrainingCard card={card} key={index} />))}
  </>);
};

export default TrainingCards;
