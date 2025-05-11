const config = {
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
};

const apiConfig = {
  apiBaseUrl: config.baseURL,
  timeout: 10000, // 10 seconds
  headers: config.headers,
  withCredentials: true,
};

export { apiConfig };
