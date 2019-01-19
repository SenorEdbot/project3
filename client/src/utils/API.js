import axios from 'axios';

export default {
  saveUserStats: function(username, userData) {
    return axios.post('/api/users/' + username, userData);
  },

  getUserByUsername: function(username) {
    return axios.get('/api/users/' + username);
  }

  /** REFERENCE
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  */
};