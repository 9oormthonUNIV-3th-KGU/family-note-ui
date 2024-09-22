import { ProfileResponse } from './../model/ProfileResponse'
import apiClient from '../config/api-client'
import { FamilyCreateRequest } from '../model/FamilyCreateRequest'

export const getProfiles = (nickname: string) => {
  return apiClient.get<ProfileResponse>('/users', {
    params: { nickname: nickname },
  })
}

export const createNewFamily = (family: FamilyCreateRequest) => {
  return apiClient.post<number>('/family/members', family)
}
