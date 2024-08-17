import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from '../../share/components/alert/Alert';
import Heading from '../../share/components/headings/Heading';
import TabTitle from '../../share/components/misc/TabTitle';
import {useForm} from 'react-hook-form';
import Button from '../../share/components/button/Button';
import styles from '../../share/components/filter/GenericFilter.module.scss';
import GenericSelectInput from '../../share/components/form/GenericSelectInput';
import GenericTextInput from '../../share/components/form/GenericTextInput';
import helpers from '../../share/styles/Helpers.module.scss';
import {getAreas, getInstructors, getTrainings} from '../services/trainingRequests';
import {getInputsTrainingsFilter} from '../services/inputs/inputsTrainingsFilter';
import {handleGetEntitiesFlat} from '../../share/services/globalHandlers';
import CalendarDay from '../components/CalendarDay';
import {handleGetTrainings} from '../services/trainingHandlers';

const GetTrainings = ({ globalMessage }) => {
  const [startRange, setStartRange] = useState(null);
  const [endRange, setEndRange] = useState(null);
  const [content, setContent] = useState([]);
  const [areas, setAreas] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      await handleGetTrainings(
        {
          areas: null,
          instructors: null,
          levels: null,
          intensity: null,
          type: null
        },
        getTrainings,
        setContent,
        setStartRange,
        setEndRange,
        dispatch,
        navigate,
        setMessage,
        setMessageType);

      await handleGetEntitiesFlat(getAreas, setAreas, setMessage, setMessageType, dispatch, navigate);
      await handleGetEntitiesFlat(getInstructors, setInstructors, setMessage, setMessageType, dispatch, navigate);
    };
    fetchApi();

    console.log(content);
    console.log(startRange);
    console.log(endRange);
  }, []);

  const handleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const onFilterSubmit = async (filterFormData) => {
    await handleGetTrainings(
      filterFormData,
      setContent,
      setStartRange,
      setEndRange,
      dispatch,
      navigate,
      setMessage,
      setMessageType);
  };

  const onReset = async (e) => {
    e.preventDefault();
    await handleGetTrainings(
      {
        areas: null,
        instructors: null,
        levels: null,
        intensity: null,
        type: null
      },
      setContent,
      setStartRange,
      setEndRange,
      dispatch,
      navigate,
      setMessage,
      setMessageType);
  };

  const onClear = () => {
    reset();
    setMessage('');
    setMessageType('');
  };

  return (<>
    <TabTitle title='Training'/>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
    <Alert message={message} messageType={messageType} />
    <Heading text="Training" />
    <Button title="Add training" link="/admin/training/add" />

    {/* Filter */}
    <>
      <div className={styles.form_btn} onClick={handleFilterVisibility}>{isFilterVisible ? 'Hide Filter' : 'Filter'}</div>
      {isFilterVisible && (
        <form className={styles.form} onSubmit={handleSubmit(onFilterSubmit)}>
          <div className={styles['form_upper']}>
            {getInputsTrainingsFilter(areas, instructors).map((inputProps, index) => {
              const {label, type, name, placeholder, options, isMultiple, rules} = inputProps;
              const Component = type === 'select' ? GenericSelectInput : GenericTextInput;

              return (
                <Component
                  key={index}
                  label={label}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  options={options}
                  isMultiple={isMultiple}
                  rules={rules}
                  register={register}
                  error={errors[name]}
                  getValues={getValues}
                />
              );
            })}
          </div>
          <div className={styles['form_lower']}>
            <button className={`${styles.form_btn} ${helpers['mr-sm']}`} onClick={onReset}>Reset</button>
            <button className={`${styles.form_btn} ${helpers['mr-sm']}`} type="button" onClick={onClear}>Clear</button>
            <button className={styles.form_btn} type="submit">Submit</button>
          </div>
        </form>
      )}
    </>

    {/* Training */}
    {content && content.length > 0 && (<>
      <div>Start range: {startRange}, end range: {endRange}</div>
      {content.map((day, index) => (
        <div key={index}>
          <div>Date: {day.date}, Day: {day.dayOfWeek}</div>
          <CalendarDay day={day} />
        </div>
      ))}
    </>)}

  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(GetTrainings);