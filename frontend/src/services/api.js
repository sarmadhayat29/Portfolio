import { supabase } from '../utils/supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fetchWithAuth = async (endpoint, options = {}) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  return response.json();
};

export const api = {
  submitContact: (data) => fetchWithAuth('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getTodos: () => fetchWithAuth('/todos'),
  createTodo: (name) => fetchWithAuth('/todos', {
    method: 'POST',
    body: JSON.stringify({ name }),
  }),
};
