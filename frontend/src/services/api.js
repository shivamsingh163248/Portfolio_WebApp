import axios from 'axios';

// API Base URL - defaults to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile API
export const profileAPI = {
  getAll: () => api.get('/api/profile/'),
  getById: (id) => api.get(`/api/profile/${id}`),
  create: (data) => api.post('/api/profile/', data),
  update: (id, data) => api.put(`/api/profile/${id}`, data),
  delete: (id) => api.delete(`/api/profile/${id}`),
};

// Skills API
export const skillsAPI = {
  getAll: (params) => api.get('/api/skills/', { params }),
  getById: (id) => api.get(`/api/skills/${id}`),
  getTop: (limit = 10) => api.get('/api/skills/top', { params: { limit } }),
  getCategories: () => api.get('/api/skills/categories'),
  getByCategory: (profileId = 1) => api.get('/api/skills/by-category', { params: { profile_id: profileId } }),
  create: (data) => api.post('/api/skills/', data),
  update: (id, data) => api.put(`/api/skills/${id}`, data),
  delete: (id) => api.delete(`/api/skills/${id}`),
};

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get('/api/projects/', { params }),
  getById: (id) => api.get(`/api/projects/${id}`),
  getBySkill: (skill) => api.get('/api/projects/', { params: { skill } }),
  create: (data) => api.post('/api/projects/', data),
  update: (id, data) => api.put(`/api/projects/${id}`, data),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

// Education API
export const educationAPI = {
  getAll: (params) => api.get('/api/education/', { params }),
  getById: (id) => api.get(`/api/education/${id}`),
  create: (data) => api.post('/api/education/', data),
  update: (id, data) => api.put(`/api/education/${id}`, data),
  delete: (id) => api.delete(`/api/education/${id}`),
};

// Work Experience API
export const workExperienceAPI = {
  getAll: (params) => api.get('/api/work-experience/', { params }),
  getById: (id) => api.get(`/api/work-experience/${id}`),
  create: (data) => api.post('/api/work-experience/', data),
  update: (id, data) => api.put(`/api/work-experience/${id}`, data),
  delete: (id) => api.delete(`/api/work-experience/${id}`),
};

// Links API
export const linksAPI = {
  getAll: (params) => api.get('/api/links/', { params }),
  getById: (id) => api.get(`/api/links/${id}`),
  create: (data) => api.post('/api/links/', data),
  update: (id, data) => api.put(`/api/links/${id}`, data),
  delete: (id) => api.delete(`/api/links/${id}`),
};

// Certifications API
export const certificationsAPI = {
  getAll: (params) => api.get('/api/certifications/', { params }),
  getById: (id) => api.get(`/api/certifications/${id}`),
  create: (data) => api.post('/api/certifications/', data),
  update: (id, data) => api.put(`/api/certifications/${id}`, data),
  delete: (id) => api.delete(`/api/certifications/${id}`),
};

// Search API
export const searchAPI = {
  search: (query) => api.get('/api/search/', { params: { q: query } }),
  searchProjectsBySkill: (skill) => api.get('/api/search/projects-by-skill', { params: { skill } }),
};

// Health Check API
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
