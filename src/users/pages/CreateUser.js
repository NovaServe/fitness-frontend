import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SESSION_EXPIRED } from '../../auth/service/messages';
import { deleteUserDataFromLocalStorage } from '../../auth/service/util';
import { SUCCESS, WARNING } from '../../share/alertMessage';
import { CREATE_USER_FAILED, USER_CREATED } from '../services/message';
import { createUser } from '../services/requests';
import Alert from '../../share/Alert';
import ValidationMessage from '../../share/ValidationMessage';

function CreateUser({ globalMessage }) {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const roles = {
  //   'ROLE_SUPERADMIN': ['ROLE_ADMIN'],
  //   'ROLE_ADMIN': ['ROLE_CUSTOMER', 'ROLE_INSTRUCTOR']
  // };

  const onSubmit = async(formData) => {
    try {
      const response = await createUser(formData);
      if (response.status === 201) {
        setMessageType(SUCCESS);
        setMessage(USER_CREATED);

      } else if (response.status === 401) {
        deleteUserDataFromLocalStorage();
        dispatch({ type: 'LOGGED_OUT' });
        dispatch({
          type: 'SET_GLOBAL_MESSAGE',
          payload: { message: SESSION_EXPIRED, messageType: WARNING }
        });
        navigate('/');
      } else {
        setMessageType(WARNING);
        setMessage(CREATE_USER_FAILED + ': ' + response.status);
      }
    } catch (error) {
      setMessageType(WARNING);
      setMessage(error.message);
    }
  };

  const onClear = () => {
    reset();
    setMessage('');
    setMessageType('');
  };

  return (<>
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
    </HelmetProvider>

    {globalMessage && globalMessage.body ?
      <Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}

    <Alert message={message} messageType={messageType} />

    <h3>Add user</h3>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          {...register('username', {
            required: 'Value is required',
            minLength: { value: 3, message: 'Must be at least 3 characters' },
            maxLength: { value: 20, message: 'Must not exceed 20 characters' }
          })}
        />
        {errors.username && (<ValidationMessage message={errors.username.message} />)}
      </div>

      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input
          type='text'
          {...register('fullName', {
            required: 'Value is required',
            minLength: { value: 3, message: 'Must be at least 3 characters' },
            maxLength: { value: 50, message: 'Must not exceed 50 characters' }
          })}
        />
        {errors.fullName && (<ValidationMessage message={errors.fullName.message} />)}
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          {...register('email', {
            required: 'Value is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && (<ValidationMessage message={errors.email.message} />)}
      </div>

      <div>
        <label htmlFor='phone'>Phone</label>
        <input
          type='tel'
          {...register('phone', {
            required: 'Value is required',
            pattern: {
              value: /^\d{3}-\d{3}-\d{4}$/,
              message: 'Invalid phone number (XXX-XXX-XXXX)'
            }
          })}
        />
        {errors.phone && (<ValidationMessage message={errors.phone.message} />)}
      </div>

      <div>
        <label htmlFor='role'>Role</label>
        <select
          {...register('role', {
            required: 'Value is required'
          })}
        >
          <option value=''>Select a role</option>
          <option value='ROLE_ADMIN'>Admin</option>
          <option value='ROLE_CUSTOMER'>Customer</option>
          <option value='ROLE_INSTRUCTOR'>Instructor</option>
        </select>
        {errors.role && (<ValidationMessage message={errors.role.message} />)}
      </div>

      <div>
        <label htmlFor='gender'>Gender</label>
        <select
          {...register('gender', {
            required: 'Value is required'
          })}
        >
          <option value=''>Select a gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        {errors.gender && (<ValidationMessage message={errors.gender.message} />)}
      </div>

      <div>
        <label htmlFor='ageGroup'>Age Group</label>
        <select
          {...register('ageGroup', {
            required: 'Value is required'
          })}
        >
          <option value=''>Select an age group</option>
          <option value='Child'>Child</option>
          <option value='Teen'>Teen</option>
          <option value='Adult'>Adult</option>
          <option value='Senior'>Senior</option>
        </select>
        {errors.ageGroup && (<ValidationMessage message={errors.ageGroup.message} />)}
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          {...register('password', {
            required: 'Value is required',
            minLength: { value: 8, message: 'Must be at least 8 characters' },
            maxLength: { value: 20, message: 'Must not exceed 20 characters' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
            }
          })}
        />
        {errors.password && (<ValidationMessage message={errors.password.message} />)}
      </div>

      <div>
        <label htmlFor='confirmPassword'>Confirm password</label>
        <input
          type='password'
          {...register('confirmPassword', {
            required: 'Value is required',
            validate: (value) => value === getValues('password') || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && (<ValidationMessage message={errors.confirmPassword.message} />)}
      </div>

      <button type='button' onClick={onClear}>Clear</button>
      <button>Login</button>
    </form>
  </>);
}

const mapStateToProps = (state) => {
  return {
    globalMessage: state.globalMessage
  };
};

export default connect(mapStateToProps)(CreateUser);