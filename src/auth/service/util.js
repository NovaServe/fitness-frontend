export function setUserDateToLocalStorage(data) {
  deleteUserDataFromLocalStorage();
  localStorage.setItem('fullName', data.fullName);
  localStorage.setItem('role', data.role);
}

export function deleteUserDataFromLocalStorage() {
  localStorage.removeItem('fullName');
  localStorage.removeItem('role');
}

export function getFullNameFromLocalStorage() {
  return localStorage.getItem('fullName');
}

export function getRoleFromLocalStorage() {
  return localStorage.getItem('role');
}