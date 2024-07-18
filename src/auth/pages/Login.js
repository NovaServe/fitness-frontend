import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { login } from '../service/requests.js';
import { validateToken } from '../service/requests.js';
import { setUserDateToLocalStorage, getRoleFromLocalStorage, deleteUserDataFromLocalStorage } from '../service/util.js';
import { INVALID_CREDENTIALS, NO_ACTIVE_SESSION } from '../service/messages.js';
import { WARNING } from '../../share/alertMessage.js';
import Alert from '../../share/Alert.js';
import ValidationMessage from '../../share/Alert.js';
import styles from './Login.module.scss';

function Login({ isLoggedIn, globalMessage }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	useEffect(() => {
        const requestAPI = async () => {
            const response = await validateToken();
            if (response.status === 200) {
                setUserDateToLocalStorage(response.body);
                dispatch({ type: 'LOGGED_IN' });
                dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
                if (getRoleFromLocalStorage() === 'ROLE_SUPERADMIN' || getRoleFromLocalStorage() === 'ROLE_ADMIN') {
                    navigate('/admin/training');
                } else if (getRoleFromLocalStorage() === 'ROLE_CUSTOMER') {
                    navigate('/customer/training');
                } else if (getRoleFromLocalStorage() === 'ROLE_INSTRUCTOR') {
                    navigate('/instructor/training');
                }
            } else {
                deleteUserDataFromLocalStorage();
                dispatch({
                    type: 'SET_GLOBAL_MESSAGE',
                    payload: { message: NO_ACTIVE_SESSION, messageType: WARNING }
                });
            }
        }
        requestAPI();
	}, []);

	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');

	const onClear = () => {
		reset();
		setMessage('');
		setMessageType('');
	}

	const onSubmit = async (formData) => {
		try {
			const response = await login(formData);
			if (response.status === 200) {
				setUserDateToLocalStorage(response.body);
				dispatch({ type: 'LOGGED_IN' });
				dispatch({ 
					type: 'SET_USER_DATA',
					payload: { fullName: response.body.fullName, role: response.body.role }
				});
				dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
				if (getRoleFromLocalStorage() === 'ROLE_SUPERADMIN' || getRoleFromLocalStorage() === 'ROLE_ADMIN') {
                    navigate('/admin/training');
                } else if (getRoleFromLocalStorage() === 'ROLE_CUSTOMER') {
                    navigate('/customer/training');
                } else if (getRoleFromLocalStorage() === 'ROLE_INSTRUCTOR') {
                    navigate('/instructor/training');
                }
			} else {
				setMessageType(WARNING);
				setMessage(INVALID_CREDENTIALS);
			}
		} catch (error) {
			setMessageType(WARNING);
			setMessage(error.message);
		}
	};

	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>Login</title>
				</Helmet>
			</HelmetProvider>

			<h3 className='shared_heading'>Login</h3>

			{globalMessage && globalMessage.body ?
				<Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}

			<Alert message={message} messageType={messageType} />

			<form onSubmit={handleSubmit(onSubmit)} className={styles['user-form']}>
				<div className={styles['user-form_group']}>
					<label className={styles['user-form_label']} htmlFor='usernameOrEmailOrPhone'>
						Username, email, or phone
					</label>
					<input
						type='text'
						className={styles['user-form_input']}
						{...register('usernameOrEmailOrPhone', {
							required: 'Value is required',
							minLength: { value: 3, message: 'Must be at least 3 characters' },
							maxLength: { value: 20, message: 'Must not exceed 20 characters' }
						})}
					/>
					{errors.usernameOrEmailOrPhone && (<ValidationMessage message={errors.usernameOrEmailOrPhone.message} />)}
				</div>

				<div className={styles['user-form_group']}>
					<label className={styles['user-form_label']} htmlFor='password'>Password</label>
					<input
						type='password'
						className={styles['user-form_input']}
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

				<button type='button' className={`${styles['user-form_btn']} shared_btn--mr`} onClick={onClear}>Clear</button>
				<button className={styles['user-form_btn']}>Login</button>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
		globalMessage: state.globalMessage
	};
};

export default connect(mapStateToProps)(Login);
