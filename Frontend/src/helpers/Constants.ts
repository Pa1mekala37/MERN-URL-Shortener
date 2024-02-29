export const serverUrl: string =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : import.meta.env.MODE === 'production'
      ? 'mern-url-shortener-production.up.railway.app/api'
