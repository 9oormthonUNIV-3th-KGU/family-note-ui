import { useState } from 'react'
import { createNewFamily } from '../services/family-service'
import { FamilyCreateRequest } from '../model/FamilyCreateRequest'
import { useNavigate } from 'react-router-dom'

const useFamilyCreate = () => {
  const [error, setError] = useState<string>('')
  const [isLoading, setLoader] = useState<boolean>(false)

  const navigate = useNavigate()

  const createFamily = (familyCreateRequest: FamilyCreateRequest) => {
    setLoader(true)
    createNewFamily(familyCreateRequest)
      .then((response) => {
        if (response && response.status === 201) {
          const familyId = response.data.familyId
          navigate('/home')
          localStorage.setItem('familyId', familyId.toString())
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoader(false))
  }
  return { createFamily, error, isLoading }
}

export default useFamilyCreate
