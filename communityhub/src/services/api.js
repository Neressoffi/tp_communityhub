const API_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'X-Project-Key': PROJECT_KEY,  
    ...options.headers,
  };

  if (token) {
    headers['X-Auth-Token'] = token;  
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    let errorMessage = data?.message || 'Une erreur est survenue';

    if (data?.errors && typeof data.errors === 'object') {
      const details = Object.values(data.errors).join(' ');
      if (details) errorMessage = details;
    }

    throw new Error(errorMessage);
  }

  return data;
}