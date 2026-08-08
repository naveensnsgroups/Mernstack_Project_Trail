import axios from 'axios';

const api = axios.create({
  baseURL: '/api/employees',
  headers: { 'Content-Type': 'application/json' },
});

// Global response interceptor — handles network errors and unexpected responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error — server unreachable
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    // Pass through HTTP errors so components can read error.response.data
    return Promise.reject(error);
  }
);

export const getAllEmployees  = ()         => api.get('/');
export const getEmployeeById = (id)        => api.get(`/${id}`);
export const createEmployee  = (data)      => api.post('/', data);
export const updateEmployee  = (id, data)  => api.put(`/${id}`, data);
export const deleteEmployee  = (id)        => api.delete(`/${id}`);
