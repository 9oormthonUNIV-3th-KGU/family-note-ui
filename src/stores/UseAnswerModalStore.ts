import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  toggleModal: () => void
  answer: string
  setAnswer: (newAnswer: string) => void
}

const UseAnswerModalStore = create<ModalState>((set) => ({
  isOpen: false,
  toggleModal: () =>
    set((state) => {
      if (state.isOpen) {
        return { isOpen: false, answer: '' }
      } else {
        return { isOpen: true }
      }
    }),
  answer: '',
  setAnswer: (newAnswer: string) => set({ answer: newAnswer }),
}))

export default UseAnswerModalStore
