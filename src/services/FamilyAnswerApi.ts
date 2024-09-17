import axios from 'axios'

const token = import.meta.env.VITE_TEST_USER_API

export const FetchFamilyAnswers = async (familyId: number) => {
  try {
    const response = await axios.get(`/family/answer/${familyId}`, {
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

export const PostFamilyAnswer = async (familyId: number, content: string) => {
  try {
    const response = await axios.post(
      `/family/answer/${familyId}`,
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
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message || 'An unexpected error occurred')
    } else {
      alert('An unexpected error occurred')
    }
    console.error('Error posting data:', error)
    throw error
  }
}
