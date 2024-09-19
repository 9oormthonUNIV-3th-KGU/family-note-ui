import axios from 'axios'
import { loadAuthToken, loadFamilyId } from '../utils/UserToken'

const token = loadAuthToken()
const familyId = loadFamilyId()

export const FetchFamilyData = async () => {
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
