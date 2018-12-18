import api from './api'

export default {
  all: () => api.get('/users'),
  create: (newExample) => api.post('/users', newExample),
  delete: (id) => api.delete(`/users/${id}`)
}
