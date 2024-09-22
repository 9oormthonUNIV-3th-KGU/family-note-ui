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
        try {
          if (authObject.includes('.')) {
            config.headers.Authorization = `Bearer ${authObject}`
          } else {
            const { accessToken } = JSON.parse(authObject) as AuthResponse
            config.headers.Authorization = `Bearer ${accessToken}`
          }
        } catch (e) {
          console.error('Error parsing authObject from localStorage:', e)
        }
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
