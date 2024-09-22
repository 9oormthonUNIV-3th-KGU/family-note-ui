import { ProfileResponse } from './../model/ProfileResponse'
import apiClient from '../config/api-client'
import { FamilyCreateRequest } from '../model/FamilyCreateRequest'
import { FamilyCreateResponse } from '../model/FamilyCreateResponse'

export const fetchProfiles = (nickname: string) => {
  return apiClient.get<ProfileResponse>('/users', {
    params: { nickname: nickname },
  })
}

export const createNewFamily = (family: FamilyCreateRequest) => {
  return apiClient.post<FamilyCreateResponse>('/family/members', family)
}
