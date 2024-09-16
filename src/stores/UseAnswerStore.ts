import { create } from 'zustand'

interface AnswerState {
  answers: { nickname: string; content: string }[]
  setAnswers: (newAnswers: { nickname: string; content: string }[]) => void
}

const UseAnswerStore = create<AnswerState>((set) => ({
  answers: [],
  setAnswers: (newAnswers) => set({ answers: newAnswers }),
}))

export default UseAnswerStore
