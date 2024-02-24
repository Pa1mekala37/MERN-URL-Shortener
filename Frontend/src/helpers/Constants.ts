export const serverUrl =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : 'https://mern-url-shortener-1.onrender.com/api';
