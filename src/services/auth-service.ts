import apiClient from '../config/api-client'
import { AuthRequest } from '../model/AuthRequest'
import { AuthResponse } from '../model/AuthResponse'
import { ProfileResponse } from '../model/ProfileResponse'

export const createProfile = (profile: AuthRequest) => {
  return apiClient.post<ProfileResponse>('/users/signup', profile)
}

export const authenticate = (authRequest: AuthRequest) => {
  return apiClient.post<AuthResponse>('/login', authRequest)
}
