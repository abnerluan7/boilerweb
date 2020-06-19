async function apiClient(
  endpoint: RequestInfo,
  { body, ...customConfig }: RequestInit = {}
) {
  const headers = { "Content-Type": "application/json" };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const API_URL = process.env.REACT_APP_API_URL;

  return fetch(`${API_URL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // unauthorized
      return;
    }

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export default apiClient;
