import axios from 'axios'

const token = import.meta.env.VITE_TEST_USER_API

{
  /* 로그인 api 연동 후 수정 */
}
export const FetchFamilyData = async (familyId: number = 2) => {
  try {
    const response = await axios.get(`/family/${familyId}`, {
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
