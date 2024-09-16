import axios from 'axios'

const token = import.meta.env.VITE_TEST_USER_API

export const FetchFamilyQuestions = async (
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await axios.get(
      `/api/v1/family/question?page=${page}&size=${size}`,
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
