import { create } from 'zustand'

interface PopupState {
  isOpen: boolean
  openPopup: () => void
  closePopup: () => void
}

const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
}))

export default usePopupStore
