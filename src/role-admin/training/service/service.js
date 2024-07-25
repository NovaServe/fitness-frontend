export async function getTestMessage() {
  const response = await fetch('/api/v1/test', {
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
}
