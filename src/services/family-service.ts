import { ProfileResponse } from './../model/ProfileResponse'
import apiClient from '../config/api-client'

export const getProfiles = () => {
  return apiClient.get<ProfileResponse[]>('/users')
}
