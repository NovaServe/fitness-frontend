import {getRoleFromLocalStorage} from '../../../auth/services/util';

export const getInputsListUsersFilter = () => {
  const role = getRoleFromLocalStorage();
  const baseOpts = [{ value: '', label: 'Profile role' }];
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
      // label: 'Role',
      type: 'select',
      name: 'roles',
      options: opts,
      isMultiple: true,
      rules: {
        required: 'Value is required'
      }
    },
    {
      // label: 'Full name',
      type: 'text',
      name: 'fullName',
      placeholder: 'Filter by full name',
      rules: {
        required: false,
        minLength: { value: 3, message: 'Must be at least 3 characters' },
        maxLength: { value: 20, message: 'Must not exceed 20 characters' }
      }
    },
    {
      // label: 'Page Size',
      type: 'select',
      name: 'pageSize',
      options: [{ value: '', label: 'Page size' }, {value: '5', label: '5'}, {value: '10', label: '10'}, {value: '15', label: '15'}],
      isMultiple: false,
      rules: {
        required: false
      }
    },
    {
      // label: 'Sort by',
      type: 'select',
      name: 'sortBy',
      options: [{ value: '', label: 'Sort by' }, {value: 'id', label:'id'}, {value: 'fullName', label: 'fullName'} ],
      isMultiple: false,
      rules: {
        required: false
      }
    },
    {
      // label: 'Order',
      type: 'select',
      name: 'order',
      options: [{ value: '', label: 'Order' }, {value: 'ASC', label:'Ascending'}, {value: 'DESC', label: 'Descending'}],
      isMultiple: false,
      rules: {
        required: false
      }
    },
  ];
};