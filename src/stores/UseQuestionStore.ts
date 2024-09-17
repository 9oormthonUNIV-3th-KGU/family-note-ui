import { create } from 'zustand'
import {
  FetchFamilyQuestions,
  FetchFamilyNewQuestions,
} from '../services/GetFamilyQuestionApi'

// API 응답 타입 정의
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

// 기존 QuestionBox 타입
interface QuestionBox {
  id: number
  content: string
  createdAt: Date
  isAnswerVisible: boolean
  animationState: 'scale-up' | 'scale-out' | 'none'
}

// 상태 관리 인터페이스
interface QuestionState {
  isAnswerVisible: boolean
  isBoxHighlighted: boolean
  animationState: 'scale-up' | 'scale-out' | 'none'
  questionBoxes: QuestionBox[]
  selectedQuestion: QuestionBox | null
  isDisplayed: boolean
  toggleAnswerVisibility: (id: number) => void
  toggleBoxHighlight: () => void
  addQuestionBox: (content: string) => void
  setAnswerVisibility: (visible: boolean) => void
  setAnimationState: (state: 'none' | 'scale-up' | 'scale-out') => void
  setSelectedQuestion: (question: QuestionBox) => void
  clearSelectedQuestion: () => void
  setIsDisplayed: (state: boolean) => void
  fetchQuestions: (page: number, size: number) => void
  fetchNewQuestions: () => void
}

const useQuestionStore = create<QuestionState>((set) => ({
  isAnswerVisible: false,
  isBoxHighlighted: false,
  animationState: 'none',
  questionBoxes: [],
  selectedQuestion: null,
  isDisplayed: false,

  setAnswerVisibility: (visible) => set({ isAnswerVisible: visible }),

  setAnimationState: (state) => {
    set({ animationState: state })

    if (state === 'scale-out') {
      setTimeout(() => {
        set({ isDisplayed: false })
      }, 500) // 500ms 후 실행
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

  addQuestionBox: (content: string) =>
    set((state) => ({
      questionBoxes: [
        {
          id: Date.now(),
          content,
          isAnswerVisible: false,
          animationState: 'none',
          createdAt: new Date(),
        },
        ...state.questionBoxes,
      ],
    })),

  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  clearSelectedQuestion: () => set({ selectedQuestion: null }),

  setIsDisplayed: (newState) => set({ isDisplayed: newState }),

  fetchQuestions: async (page: number, size: number) => {
    try {
      const response: QuestionApiResponse = await FetchFamilyQuestions(
        page,
        size
      )
      set({
        questionBoxes: response.contents.map((item) => ({
          id: item.familyQuestionId,
          content: item.content,
          createdAt: new Date(item.createdAt),
          isAnswerVisible: false,
          animationState: 'none',
        })),
      })
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  },

  fetchNewQuestions: async () => {
    try {
      const response = await FetchFamilyNewQuestions()

      if (response.familyQuestionId) {
        await useQuestionStore.getState().fetchQuestions(0, 10)
      }
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    }
  },
}))

export default useQuestionStore
