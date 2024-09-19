export const loadAuthToken = (): string | null => {
  return localStorage.getItem('auth_token')
}

export const loadFamilyId = (): string | null => {
  return localStorage.getItem('familyId')
}
