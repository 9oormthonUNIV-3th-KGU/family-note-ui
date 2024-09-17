import { create } from 'zustand'

interface SearchState {
  isOpen: boolean
  openSearchBox: () => void
  closeSearchBox: () => void
}

const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  openSearchBox: () => set({ isOpen: true }),
  closeSearchBox: () => set({ isOpen: false }),
}))

export default useSearchStore
