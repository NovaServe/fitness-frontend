let BASE_URL = '/api/v1';
let LOGIN = `${BASE_URL}/auth/login`;
let LOGOUT = `${BASE_URL}/auth/logout`;
let VALIDATE_TOKEN = `${BASE_URL}/auth/validate`;

export const login = async (requestDto) => {
  const response = await fetch(LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestDto)
  });
  const data = await response.json();
  return {
    status: response.status,
    body: data
  };
};

export const logout = async () => {
  const response = await fetch(LOGOUT, {
    method: 'GET'
  });
  return {
    status: response.status
  };
};

export const validateToken = async () => {
  const response = await fetch(VALIDATE_TOKEN, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return {
    status: response.status,
    body: data
  };
};