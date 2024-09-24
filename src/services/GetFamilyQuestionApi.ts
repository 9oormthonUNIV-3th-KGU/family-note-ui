import axios from 'axios'
import apiClient from '../config/api-client'

export const FetchFamilyQuestions = async (
  familyId: number,
  page: number,
  size: number
) => {
  try {
    const response = await apiClient.get(
      `/family/question/${familyId}?page=${page}&size=${size}`
    )
    if (response.data.pageable.totalElements === 0) {
      console.log('가족에게 할당된 질문이 없습니다.')
      return 'no question'
    }
    console.log(response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('HTTP Status Code:', error.response?.status)
      if (error) {
        console.error('An unexpected error occurred:', error)
      }
    }
    throw error
  }
}

export const FetchFamilyNewQuestions = async (familyId: number) => {
  try {
    const response = await apiClient.post(`/family/question/${familyId}`, {})
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
