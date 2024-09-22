import { ProfileResponse } from '../model/ProfileResponse'
import { getProfiles } from '../services/family-service'
import React, { useEffect, useState } from 'react'

const useProfiles = () => {
  const [profiles, setProfiles] = useState<ProfileResponse[]>([])
  const [error, setErrors] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)
  useEffect(() => {
    setLoader(true)
    getProfiles()
      .then((response) => {
        setProfiles(response.data)
      })
      .catch((error) => setErrors(error.message))
      .finally(() => setLoader(false))
  }, [])
  return { profiles, error, isLoading }
}

export default useProfiles
