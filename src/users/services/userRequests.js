const BASE_URL = '/api/v1';
const USERS = `${BASE_URL}/users`;

export const createUser = async (requestDto) => {
  const res = await fetch(USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestDto)
  });
  return {
    status: res.status
  };
};

export const getUsers = async (requestParams) => {
  const res = await fetch(USERS + requestParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return {
    status: res.status,
    body: data
  };
};