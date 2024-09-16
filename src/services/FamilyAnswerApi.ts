import axios from 'axios'

const token = import.meta.env.VITE_TEST_USER_API

export const FetchFamilyAnswers = async (familyId: number = 1) => {
  try {
    const response = await axios.get(`/api/v1/family/answer/${familyId}`, {
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

export const PostFamilyAnswer = async (
  familyId: number = 1,
  content: string
) => {
  try {
    const response = await axios.post(
      `/api/v1/family/answer/${familyId}`,
      { content },
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
    console.error('Error posting data:', error)
    throw error
  }
}
