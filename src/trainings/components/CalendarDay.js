import React from 'react';
import TrainingCard from './TrainingCard';

const CalendarDay = ({day}) => {
  return (<>
    {(!day.trainings || day.trainings.length === 0) && (<div>No activities</div>)}
    {day.trainings.length > 0 && (
      <div>
        {day.trainings.map((training, index) => (<TrainingCard key={index} training={training} />))}
      </div>)}

  </>);
};

export default CalendarDay;