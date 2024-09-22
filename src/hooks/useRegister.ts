import { useState } from 'react'
import { createProfile } from '../services/auth-service'
import { AuthRequest } from '../model/AuthRequest'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const [error, setError] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)
  const [toast, setToast] = useState<string>('')

  const navigate = useNavigate()

  const signup = (
    profile: AuthRequest,
    setErrors: (errors: any) => void,
    resetForm: () => void
  ) => {
    setLoader(true)
    createProfile(profile)
      .then((response) => {
        if (response && response.status === 201) {
          setToast('Profile is successfully created')
          resetForm()
          navigate('/login')
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.code === 'USER_NICKNAME_DUPLICATED'
        ) {
          setErrors({ nickname: '중복된 닉네임입니다.' })
        } else {
          setError(error.message)
        }
      })
      .finally(() => setLoader(false))
  }
  return { error, isLoading, signup, toast }
}
