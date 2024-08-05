import React from 'react';
import {parseRole} from '../services/userUtils';
import Card from '../../share/components/card/Card';

const UserCard = ({ id, role, username, fullName, email, gender, ageGroup  }) => {
  const fields = [
    { label: 'Id', value: id },
    { label: 'Role', value: parseRole(role) },
    { label: 'Username', value: username },
    { label: 'Full name', value: fullName },
    { label: 'Email', value: email },
    { label: 'Gender', value: gender },
    { label: 'Age group', value: ageGroup }
  ];

  const button = {
    title: 'Manage',
    link: `/admin/profiles/${id}`
  };

  return <Card fields={fields} button={button} />;
};

export default UserCard;