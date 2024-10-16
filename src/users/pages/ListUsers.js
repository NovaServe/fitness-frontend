import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Alert from '../../share/components/alert/Alert';
import Button from '../../share/components/button/Button';
import {useNavigate} from 'react-router-dom';
import Heading from '../../share/components/headings/Heading';
import { getUsers} from '../services/userRequests';
import UserCard from '../components/UserCard';
import {handleGenericFilterSubmission} from '../../share/components/filter/handleGenericFilterSubmission';
import helpers from '../../share/styles/Helpers.module.scss';
import Pagination from '../../share/components/pagination/Pagination';
import {useForm} from 'react-hook-form';
import styles from '../../share/components/filter/GenericFilter.module.scss';
import GenericSelectInput from '../../share/components/form/GenericSelectInput';
import GenericTextInput from '../../share/components/form/GenericTextInput';
import {getInputsListUsersFilter} from '../services/inputs/inputsListUsersFilter';
import Found from '../../share/components/found/Found';
import {getRolesForUrlParams} from '../services/userUtils';

const ListUsers = ({ globalMessage }) => {
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberZeroBased, setPageNumberZeroBased] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      await handleGenericFilterSubmission(
        {
          roles: getRolesForUrlParams(),
          fullName: null,
          pageSize: null,
          sortBy: null,
          order: null
        },
        0,
        getUsers,
        setUsers,
        setTotalPages,
        setTotalElements,
        setPageNumberZeroBased,
        dispatch,
        navigate,
        setMessage,
        setMessageType,
      );
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
      getUsers,
      setUsers,
      setTotalPages,
      setTotalElements,
      setPageNumberZeroBased,
      dispatch,
      navigate,
      setMessage,
      setMessageType,
    );
  };

  const onReset = async (e) => {
    e.preventDefault();
    await handleGenericFilterSubmission(
      {
        roles: getRolesForUrlParams(),
        fullName: null,
        pageSize: null,
        sortBy: null,
        order: null
      },
      0,
      getUsers,
      setUsers,
      setTotalPages,
      setTotalElements,
      setPageNumberZeroBased,
      dispatch,
      navigate,
      setMessage,
      setMessageType,
    );
  };

  const onClear = () => {
    reset();
    setMessage('');
    setMessageType('');
  };

  const onPageChange = async (newPageNumberZeroBased) => {
    await handleGenericFilterSubmission(
      {
        roles: getValues('roles'),
        fullName: getValues('fullName'),
        pageSize: getValues('pageSize'),
        sortBy: getValues('sortBy'),
        order: getValues('order')
      },
      newPageNumberZeroBased,
      getUsers,
      setUsers,
      setTotalPages,
      setTotalElements,
      setPageNumberZeroBased,
      dispatch,
      navigate,
      setMessage,
      setMessageType,
    );
  };

  return (<>
    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}
    <Alert message={message} messageType={messageType} />
    <Heading text="Profiles" />
    <Button title="Add profile" link="/admin/profiles/add" />

    {/* Filter */}
    <>
      <div className={styles.form_btn} onClick={handleFilterVisibility}>{isFilterVisible ? 'Hide Filter' : 'Filter'}</div>
      {isFilterVisible && (
        <form className={styles.form} onSubmit={handleSubmit(onFilterSubmit)}>
          <div className={styles['form_upper']}>
            {getInputsListUsersFilter().map((inputProps, index) => {
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

    {/* Users */}
    {users && users.length > 0 && (<>
      <Found totalElements={totalElements}/>
      <div className={helpers['cards-container']}>
        {users.map((user) =>
          (<UserCard
            key={user.id}
            id={user.id}
            role={user.role}
            username={user.username}
            fullName={user.fullName}
            email={user.email}
            gender={user.gender}
            ageGroup={user.ageGroup}/>))}
      </div>
    </>
    )}

    <Pagination pageNumberZeroBased={pageNumberZeroBased} totalPages={totalPages} onPageChange={onPageChange}/>
  </>);
};

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(ListUsers);