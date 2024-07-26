let BASE_URL = '/api/v1';
let CREATE_USER = `${BASE_URL}/users`;

export async function createUser(requestDto) {
  const response = await fetch(CREATE_USER, {
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
}