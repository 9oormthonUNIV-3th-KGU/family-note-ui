import { useState } from 'react'
import { createProfile } from '../services/auth-service'
import { AuthRequest } from '../model/AuthRequest'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const [error, setError] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)
  const [toast, setToast] = useState<string>('')

  const navigate = useNavigate()

  const signup = (profile: AuthRequest) => {
    setLoader(true)
    createProfile(profile)
      .then((response) => {
        if (response && response.status === 201) {
          setToast('Profile is successfully created')
          navigate('/login')
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoader(false))
  }
  return { error, isLoading, signup, toast }
}
