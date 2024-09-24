import { create } from 'zustand'
import {
  FetchFamilyQuestions,
  FetchFamilyNewQuestions,
} from '../services/GetFamilyQuestionApi'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'

interface QuestionApiResponse {
  contents: {
    familyQuestionId: number
    content: string
    createdAt: string
  }[]
  pageable: {
    page: number
    size: number
    totalPages: number
    totalElements: number
    isEnd: boolean
  }
}

interface QuestionBox {
  id: number
  content: string
  createdAt: Date
  isAnswerVisible: boolean
  animationState: 'scale-up' | 'scale-out' | 'none'
}

interface QuestionState {
  isAnswerVisible: boolean
  isBoxHighlighted: boolean
  animationState: 'scale-up' | 'scale-out' | 'none'
  questionBoxes: QuestionBox[]
  selectedQuestion: QuestionBox | null
  isDisplayed: boolean
  isFetching: boolean
  toggleAnswerVisibility: (id: number) => void
  toggleBoxHighlight: () => void
  setAnswerVisibility: (visible: boolean) => void
  setAnimationState: (state: 'none' | 'scale-up' | 'scale-out') => void
  setSelectedQuestion: (question: QuestionBox) => void
  clearSelectedQuestion: () => void
  setIsDisplayed: (state: boolean) => void
  fetchQuestions: (familyId: number, page: number, size: number) => void
  fetchNewQuestions: (familyId: number) => void
  setIsFetching: (value: boolean) => void
  resetQuestionState: () => void
}

const useQuestionStore = create<QuestionState>((set) => ({
  isAnswerVisible: false,
  isBoxHighlighted: false,
  animationState: 'none',
  questionBoxes: [],
  selectedQuestion: null,
  isDisplayed: false,
  isFetching: false,

  setAnswerVisibility: (visible) => set({ isAnswerVisible: visible }),

  setAnimationState: (state) => {
    set({ animationState: state })
    if (state === 'scale-out') {
      setTimeout(() => {
        set({ isDisplayed: false })
      }, 500)
    }
  },

  toggleAnswerVisibility: (id: number) =>
    set((state) => ({
      questionBoxes: state.questionBoxes.map((question) =>
        question.id === id
          ? {
              ...question,
              isAnswerVisible: !question.isAnswerVisible,
              animationState: question.isAnswerVisible
                ? 'scale-out'
                : 'scale-up',
            }
          : question
      ),
    })),

  toggleBoxHighlight: () =>
    set((state) => ({ isBoxHighlighted: !state.isBoxHighlighted })),

  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  clearSelectedQuestion: () => set({ selectedQuestion: null }),

  setIsDisplayed: (newState) => set({ isDisplayed: newState }),

  fetchQuestions: async (familyId: number, page: number, size: number) => {
    try {
      const result = await FetchFamilyQuestions(familyId, page, size)

      if (result === 'no question' || !result) {
        const { setActivate } = UseGetQuestionBtnStore.getState()
        setActivate()
        return
      }

      if (result.contents && result.contents.length > 0) {
        const response: QuestionApiResponse = result
        const questions: QuestionBox[] = response.contents.map((item) => ({
          id: item.familyQuestionId,
          content: item.content,
          createdAt: new Date(item.createdAt),
          isAnswerVisible: false,
          animationState: 'none',
        }))

        set({
          questionBoxes: questions,
        })
      }
    } catch (error) {
      console.error('질문을 가져오는 중 오류 발생:', error)
    }
  },

  fetchNewQuestions: async (familyId: number) => {
    try {
      const response = await FetchFamilyNewQuestions(familyId)
      if (response.familyQuestionId) {
        await useQuestionStore.getState().fetchQuestions(familyId, 0, 45)
        const { setActivate } = UseGetQuestionBtnStore.getState()
        setActivate()
        console.log('새로운 질문을 성공적으로 받아왔습니다.')
      }
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    }
  },

  setIsFetching: (value) => set({ isFetching: value }),
  resetQuestionState: () => set({ questionBoxes: [], selectedQuestion: null }),
}))

export default useQuestionStore
