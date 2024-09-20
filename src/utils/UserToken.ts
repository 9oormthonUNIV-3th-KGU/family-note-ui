export const loadAuthToken = (): string | null => {
  return localStorage.getItem('user')
}

export const loadFamilyId = (): string | null => {
  return localStorage.getItem('familyId')
}
