export const serverUrl: string =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : import.meta.env.MODE === 'production'
      ? 'https://mern-url-shortener-production.up.railway.app/api'
      : '';
