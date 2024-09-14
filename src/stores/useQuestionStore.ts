import { create } from 'zustand'

interface QuestionState {
  isAnswerVisible: boolean
  isBoxHighlighted: boolean
  toggleAnswerVisibility: () => void
  toggleBoxHighlight: () => void
}

const useQuestionStore = create<QuestionState>((set) => ({
  isAnswerVisible: false,
  isBoxHighlighted: false,
  toggleAnswerVisibility: () =>
    set((state) => ({ isAnswerVisible: !state.isAnswerVisible })),
  toggleBoxHighlight: () =>
    set((state) => ({ isBoxHighlighted: !state.isBoxHighlighted })),
}))

export default useQuestionStore
