export const serverUrl: string = import.meta.env.MODE === 'development'? 'http://localhost:5001/api': '/api';
