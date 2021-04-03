import axios from 'axios'

const baseUrl = '/api/users'

const register = async (user) => {
  const response = await axios.post(`${baseUrl}/register`, user)
  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const logout = () => {
  localStorage.removeItem('limonellouser')
}

export default {
  login,
  logout,
  register
}