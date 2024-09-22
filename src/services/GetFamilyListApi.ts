import apiClient from '../config/api-client'

export const FetchFamilyList = async () => {
  try {
    const response = await apiClient.get(`/family/list`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching family list:', error)
    throw error
  }
}
