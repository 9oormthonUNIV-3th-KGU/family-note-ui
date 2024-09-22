import { authenticate } from './../services/auth-service'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthRequest } from '../model/AuthRequest'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)
  const navigate = useNavigate()
  const { updateAuth } = useAuthContext()
  const login = (authRequest: AuthRequest) => {
    setLoader(true)
    authenticate(authRequest)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        updateAuth(true)
        navigate('/search')
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message)
        } else {
          setError(error.message)
        }
      })
      .finally(() => setLoader(false))
  }
  return { error, isLoading, login }
}
