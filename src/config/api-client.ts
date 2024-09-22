import axios from 'axios'
import useCurrentUserStore from '../stores/useCurrentUserStore'

const apiClient = axios.create({
  baseURL: 'http://211.188.49.236:5252/api/v1',
})

apiClient.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/login') && !config.url?.includes('/signup')) {
      const { accessToken } = useCurrentUserStore.getState()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
