import axios from 'axios'

export default axios.create({
  baseURL: 'https://midwaste-server.herokuapp.com/api'
})