import api from './api'

export default {
  saveUserStats: (username, userData) => api.post('/users/' + username, userData),
  getUserByUsername: username => api.get('/users/' + username),
  getAllUsers: () => api.get('/users/')
}
