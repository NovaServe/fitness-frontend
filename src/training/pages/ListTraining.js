import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from '../../share/components/alert/Alert';
import Heading from '../../share/components/headings/Heading';
import TabTitle from '../../share/components/misc/TabTitle';
import {useForm} from 'react-hook-form';
import {handleGenericFilterSubmission} from '../../share/components/filter/handleGenericFilterSubmission';
import Button from '../../share/components/button/Button';
import styles from '../../share/components/filter/GenericFilter.module.scss';
import GenericSelectInput from '../../share/components/form/GenericSelectInput';
import GenericTextInput from '../../share/components/form/GenericTextInput';
import helpers from '../../share/styles/Helpers.module.scss';
import Found from '../../share/components/found/Found';
import Pagination from '../../share/components/pagination/Pagination';
import {getAreas, getInstructors, getTrainingList} from '../services/trainingRequests';
import {getInputsListTrainingFilter} from '../services/inputs/inputsListTrainingFilter';
import TrainingCards from '../components/TrainingCards';
import {handleGetEntitiesFlat} from '../../share/services/globalHandlers';

const ListTraining = ({ globalMessage }) => {
  const [training, setTraining] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [areas, setAreas] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [instructors, setInstructors] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberZeroBased, setPageNumberZeroBased] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      await handleGenericFilterSubmission(
        {
          areas: null,
          instructors: null,
          levels: null,
          intensity: null,
          type: null,
          pageSize: null,
          sortBy: null,
          order: null
        },
        0,
        getTrainingList,
        setTraining,
        setTotalPages,
        setTotalElements,
        setPageNumberZeroBased,
        dispatch,
        navigate,
        setMessage,
        setMessageType);

      await handleGetEntitiesFlat(getAreas, setAreas, setMessage, setMessageType, dispatch, navigate);
      await handleGetEntitiesFlat(getInstructors, setInstructors, setMessage, setMessageType, dispatch, navigate);
    };
    fetchApi();
  }, []);

  const handleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const onFilterSubmit = async (formData) => {
    await handleGenericFilterSubmission(
      formData,
      pageNumberZeroBased,
      getTrainingList,
      setTraining,
      setTotalPages,
      setTotalElements,
      setPageNumberZeroBased,
      dispatch,
      navigate,
      setMessage,
      setMessageType);
  };

  const onReset = async (e) => {
    e.preventDefault();
    await handleGenericFilterSubmission(
      {
        areas: null,
        instructors: null,
        levels: null,
        intensity: null,
        type: null,
        pageSize: null,
        sortBy: null,
        order: null
      },
      0,
      getTrainingList,
      setTraining,
      setTotalPages,
      setTotalElements,
      setPageNumberZeroBased,
      dispatch,
      navigate,
      setMessage,
      setMessageType);
  };

  const onClear = () => {
    reset();
    setValue('pageSize', '');
    setValue('sortBy', '');
    setValue('order', '');
    setMessage('');
    setMessageType('');
  };

  const onPageChange = async (newPageNumberZeroBased) => {
    await handleGenericFilterSubmission(
      {
        areas: null,
        instructors: null,
        levels: null,
        intensity: null,
        type: null,
        pageSize: null,
        sortBy: null,
        order: null
      },
      newPageNumberZeroBased,
      getTrainingList,
      setTraining,
      setTotalPages,
      setTotalElements,
      setPageNumberZeroBased,
      dispatch,
      navigate,
      setMessage,
      setMessageType);
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
            {getInputsListTrainingFilter(areas, instructors).map((inputProps, index) => {
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
    {training && training.length > 0 && (<>
      <Found totalElements={totalElements}/>
      <div className={helpers['cards-container']}>
        <TrainingCards cards={training} />
      </div>
    </>)}

    <Pagination pageNumberZeroBased={pageNumberZeroBased} totalPages={totalPages} onPageChange={onPageChange}/>
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(ListTraining);