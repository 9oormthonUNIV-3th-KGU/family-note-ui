export const loadAuthToken = (): string | null => {
  return localStorage.getItem('auth_token')
}
