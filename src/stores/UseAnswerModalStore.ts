import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  toggleModal: () => void
  answer: string
  setAnswer: (newAnswer: string) => void
}

const UseAnswerModalStore = create<ModalState>((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  answer: '',
  setAnswer: (newAnswer: string) => set({ answer: newAnswer }),
}))

export default UseAnswerModalStore
