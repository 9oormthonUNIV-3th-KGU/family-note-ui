import axios from 'axios'
import { loadAuthToken } from '../utils/\bUserToken'

const token = loadAuthToken()

export const FetchFamilyData = async (familyId: number = 2) => {
  try {
    const response = await axios.get(`/family/${familyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
