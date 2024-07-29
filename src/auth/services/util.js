export const setUserDataToLocalStorage = (data) => {
  deleteUserDataFromLocalStorage();
  localStorage.setItem('fullName', data.fullName);
  localStorage.setItem('role', data.role);
};

export const deleteUserDataFromLocalStorage = () => {
  localStorage.removeItem('fullName');
  localStorage.removeItem('role');
};

export const getFullNameFromLocalStorage = () => {
  return localStorage.getItem('fullName');
};

export const getRoleFromLocalStorage = () => {
  return localStorage.getItem('role');
};