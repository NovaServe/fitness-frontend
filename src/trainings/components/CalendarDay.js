import React from 'react';
import TrainingCards from './TrainingCards';

const Day = ({trainingList}) => {
  return (<TrainingCards cards={trainingList} />);
};

export default Day;