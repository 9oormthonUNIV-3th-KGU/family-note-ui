import axios from 'axios'

const token = {
  /* 로그인한 사용자 token env */
}

export const fetchFamilyData = async () => {
  try {
    const response = await axios.get('/api/v1/family/1', {
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
