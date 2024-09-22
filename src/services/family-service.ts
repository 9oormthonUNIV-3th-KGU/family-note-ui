import { ProfileResponse } from './../model/ProfileResponse'
import apiClient from '../config/api-client'

export const getProfiles = (nickname: string) => {
  return apiClient.get<ProfileResponse>('/users', {
    params: { nickname: nickname },
  })
}
