import {getRoleFromLocalStorage} from '../../auth/services/util';

export const buildRequestParams = (formData, pageNumber) => {
  const params = [];
  for (const [key, value] of Object.entries(formData)) {
    if (value) {
      const valueStr = Array.isArray(value) ? value.join(',') : value;
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(valueStr);
      params.push(`${encodedKey}=${encodedValue}`);
    }
  }
  if (pageNumber) {
    params.push(`pageNumber=${pageNumber}`);
  }
  return params.length ? `?${params.join('&')}` : '';
};

export const parseRole = (role) => {
  const roleWithoutPrefix = role.replace('ROLE_', '');
  return roleWithoutPrefix.charAt(0) + roleWithoutPrefix.slice(1).toLowerCase();
};

export const getRolesForUrlParams = () => {
  const role = getRoleFromLocalStorage();
  if (role === 'ROLE_SUPERADMIN') {
    return ['ROLE_ADMIN'];
  }
  if (role === 'ROLE_ADMIN') {
    return ['ROLE_CUSTOMER', 'ROLE_INSTRUCTOR'];
  }
};