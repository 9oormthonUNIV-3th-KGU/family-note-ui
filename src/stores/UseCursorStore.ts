import { create } from 'zustand'

interface CursorState {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const UseCursorStore = create<CursorState>((set) => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}))
