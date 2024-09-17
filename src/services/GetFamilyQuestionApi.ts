import axios from 'axios'

const token = import.meta.env.VITE_TEST_USER_API

export const FetchFamilyQuestions = async (
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await axios.get(
      `/api/family/question?page=${page}&size=${size}`,
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
      `/api/family/question`, // API 엔드포인트
      {}, // 요청 본문 (빈 객체)
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰
          accept: 'application/json', // 응답 형식
          'Content-Type': 'application/json', // 요청 본문 형식
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
