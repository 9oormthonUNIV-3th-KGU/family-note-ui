import apiClient from '../config/api-client'

export const FetchFamilyData = async (familyId: number) => {
  try {
    const response = await apiClient.get(`/family/${familyId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
