import axios from 'axios'
import { AuthResponse } from '../model/AuthResponse'

const apiClient = axios.create({
  baseURL: 'http://211.188.49.236:5252/api/v1',
})

apiClient.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/login') && !config.url?.includes('/signup')) {
      const authObject = localStorage.getItem('user')
      if (authObject) {
        const { accessToken } = JSON.parse(authObject) as AuthResponse
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
