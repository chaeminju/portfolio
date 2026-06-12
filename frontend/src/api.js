import axios from 'axios'

// Vite 환경변수는 VITE_ prefix를 사용
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// TODO API
export const todoAPI = {
  getAll: (skip = 0, limit = 100, completed = null) => {
    const params = { skip, limit }
    if (completed !== null) params.completed = completed
    return api.get('/api/todos/', { params })
  },
  getById: (id) => api.get(`/api/todos/${id}`),
  create: (data) => api.post('/api/todos/', data),
  update: (id, data) => api.put(`/api/todos/${id}`, data),
  delete: (id) => api.delete(`/api/todos/${id}`),
}

// Schedule API
export const scheduleAPI = {
  getAll: (skip = 0, limit = 100, category = null) => {
    const params = { skip, limit }
    if (category) params.category = category
    return api.get('/api/schedules/', { params })
  },
  getById: (id) => api.get(`/api/schedules/${id}`),
  create: (data) => api.post('/api/schedules/', data),
  update: (id, data) => api.put(`/api/schedules/${id}`, data),
  delete: (id) => api.delete(`/api/schedules/${id}`),
}

export default api
