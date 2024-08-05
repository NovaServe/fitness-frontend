import {getRoleFromLocalStorage} from '../../../auth/services/util';

export const getInputsCreateUserForm = () => {
  const role = getRoleFromLocalStorage();
  const baseOpts = [{ value: '', label: 'Select a role' }];
  let opts;
  if (role === 'ROLE_SUPERADMIN') {
    opts = [...baseOpts, ...[
      { value: 'ROLE_ADMIN', label: 'Admin' }
    ]];
  } else if (role === 'ROLE_ADMIN') {
    opts = [...baseOpts, ...[
      { value: 'ROLE_CUSTOMER', label: 'Customer' },
      { value: 'ROLE_INSTRUCTOR', label: 'Instructor' }
    ]];
  }

  return [
    {
      label: 'Role',
      type: 'select',
      name: 'role',
      options: opts,
      rules: {
        required: 'Value is required'
      }
    },
    {
      label: 'Username',
      type: 'text',
      name: 'username',
      rules: {
        required: 'Value is required',
        minLength: { value: 3, message: 'Must be at least 3 characters' },
        maxLength: { value: 20, message: 'Must not exceed 20 characters' }
      }
    },
    {
      label: 'Full name',
      type: 'text',
      name: 'fullName',
      rules: {
        required: 'Value is required',
        minLength: { value: 3, message: 'Must be at least 3 characters' },
        maxLength: { value: 20, message: 'Must not exceed 20 characters' }
      }
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      rules: {
        required: 'Value is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      }
    },
    {
      label: 'Phone',
      type: 'tel',
      name: 'phone',
      rules: {
        required: 'Value is required',
        pattern: {
          value: /^\d{3}-\d{3}-\d{4}$/,
          message: 'Invalid phone number (XXX-XXX-XXXX)'
        }
      }
    },
    {
      label: 'Gender',
      type: 'select',
      name: 'gender',
      options: [
        { value: '', label: 'Select a gender' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ],
      rules: {
        required: 'Value is required'
      }
    },
    {
      label: 'Age group',
      type: 'select',
      name: 'ageGroup',
      options: [
        { value: '', label: 'Select an age group' },
        { value: 'Child', label: 'Child' },
        { value: 'Teenager', label: 'Teenager' },
        { value: 'Adult', label: 'Adult' },
        { value: 'Senior', label: 'Senior' }
      ],
      rules: {
        required: 'Value is required'
      }
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      rules: {
        required: 'Value is required',
        minLength: { value: 8, message: 'Must be at least 8 characters' },
        maxLength: { value: 20, message: 'Must not exceed 20 characters' },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/,
          message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'
        }
      }
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      rules: {
        required: 'Value is required',
        validate: (value, { password }) => value === password || 'Passwords do not match',
      }
    }
  ];
};