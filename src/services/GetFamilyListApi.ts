import axios from 'axios'
import { loadAuthToken } from '../utils/UserToken'

const token = loadAuthToken()

export const FetchFamilyList = async () => {
  try {
    const response = await axios.get('/family/list', {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching family list:', error)
    throw error
  }
}
