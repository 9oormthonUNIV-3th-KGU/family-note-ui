import { Content } from '../model/ProfileResponse'
import { getProfiles } from '../services/family-service'
import { useEffect, useState } from 'react'

const useProfiles = () => {
  const [currentUser, setCurrentProfiles] = useState<string>('')
  const [profiles, setProfiles] = useState<Content[]>([])
  const [error, setErrors] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)
  useEffect(() => {
    if (currentUser.trim() === '') return

    setLoader(true)
    getProfiles(currentUser)
      .then((response) => {
        setProfiles(response.data.contents)
        console.log('Response Data:', response.data.contents)
      })
      .catch((error) => setErrors(error.message))
      .finally(() => setLoader(false))
  }, [currentUser])
  return { profiles, error, isLoading, setCurrentProfiles }
}

export default useProfiles
