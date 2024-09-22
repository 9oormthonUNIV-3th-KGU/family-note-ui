import { create } from 'zustand'
import { Content } from '../model/ProfileResponse'

interface ProfileState {
  contents: Content[]
  addProfile: (content: Content) => void
  removeProfile: (id: number) => void
}

const useProfileState = create<ProfileState>((set) => ({
  contents: [],
  addProfile: (profile) =>
    set((state) => ({ contents: [...state.contents, profile] })),
  removeProfile: (id) =>
    set((state) => ({ contents: state.contents.filter((p) => p.id !== id) })),
}))

export default useProfileState
