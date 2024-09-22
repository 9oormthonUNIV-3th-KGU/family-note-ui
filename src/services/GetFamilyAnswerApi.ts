import apiClient from '../config/api-client'

export const FetchFamilyAnswers = async (familyQuestionId: number) => {
  try {
    const response = await apiClient.get(`/family/answer/${familyQuestionId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
