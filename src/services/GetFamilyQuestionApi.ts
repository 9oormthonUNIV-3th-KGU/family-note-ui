import axios from 'axios'
import { loadAuthToken } from '../utils/\bUserToken'

const token = loadAuthToken()

export const FetchFamilyQuestions = async (
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await axios.get(
      `/family/question?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching family questions:', error)
    throw error
  }
}

export const FetchFamilyNewQuestions = async () => {
  try {
    const response = await axios.post(
      `/family/question`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message || 'An unexpected error occurred')
    } else {
      alert('An unexpected error occurred')
    }
    console.error('Error posting data:', error)
    throw error
  }
}
