import { create } from 'zustand'

interface ProfileState {
  nickname: string
  accessToken: string
  setNickname: (nickname: string) => void
  setAccessToken: (accessToken: string) => void
}

const useProfileState = create<ProfileState>((set) => ({
  nickname: '',
  accessToken: '',
  setNickname: (newNickname) => set({ nickname: newNickname }),
  setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
}))

export default useProfileState
