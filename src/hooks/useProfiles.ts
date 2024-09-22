import { Content } from '../model/ProfileResponse'
import { fetchProfiles } from '../services/family-service'
import { useEffect, useState } from 'react'
import useCurrentUserStore from '../stores/useCurrentUserStore'

const useProfiles = () => {
  const [currentUser, setCurrentProfiles] = useState<string>('')
  const [profiles, setProfiles] = useState<Content[]>([])
  const [error, setErrors] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)

  const { nickname } = useCurrentUserStore()

  useEffect(() => {
    if (currentUser.trim() === '') {
      console.log('Current user is empty, skipping fetch.')
      return
    }
    setLoader(true)
    fetchProfiles(currentUser)
      .then((response) => {
        const filteredProfiles = response.data.contents.filter(
          (profile: Content) => profile.nickname !== nickname
        )
        console.log('Filtered profiles:', filteredProfiles)
        setProfiles(filteredProfiles)
        console.log('Response Data:', response.data.contents)
      })
      .catch((error) => setErrors(error.message))
      .finally(() => setLoader(false))
  }, [currentUser])
  return { setCurrentProfiles, profiles, error, isLoading }
}

export default useProfiles
