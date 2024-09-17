import axios from 'axios'
import { loadAuthToken } from '../utils/\bUserToken'

const token = loadAuthToken()

export const FetchFamilyAnswers = async (familyQuestionId: number) => {
  try {
    const response = await axios.get(`/family/answer/${familyQuestionId}`, {
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
