import axios from 'axios'
import { loadAuthToken } from '../utils/UserToken'

const token = loadAuthToken()

// 가족 구성원 모집 api 연동 후 수정
export const FetchFamilyData = async (familyId: number = 1) => {
  try {
    const response = await axios.get(`/family/${familyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
