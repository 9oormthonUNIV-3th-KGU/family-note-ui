import { authenticate } from './../services/auth-service'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthRequest } from '../model/AuthRequest'
import { useAuthContext } from './useAuthContext'
import useCurrentUserStore from '../stores/useCurrentUserStore'

export const useLogin = () => {
  const [error, setError] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)

  const navigate = useNavigate()
  const { updateAuth } = useAuthContext()

  const { setAccessToken } = useCurrentUserStore()

  const login = (authRequest: AuthRequest) => {
    setLoader(true)
    authenticate(authRequest)
      .then((response) => {
        setAccessToken(response.data.accessToken)
        updateAuth(true)
        navigate('/select')
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
