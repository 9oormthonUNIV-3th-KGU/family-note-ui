import axios from 'axios'
import apiClient from '../config/api-client'

export const FetchFamilyAnswers = async (familyId: number) => {
  try {
    const response = await apiClient.get(`/family/answer/${familyId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const PostFamilyAnswer = async (familyId: number, content: string) => {
  try {
    await apiClient.post(`/family/answer/${familyId}`, {
      content,
    })
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
