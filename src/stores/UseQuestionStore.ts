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
  isAnswerVisible: boolean // 각 QuestionBox에 대한 상태
  animationState: 'scale-up' | 'scale-out' | 'none' // 각 QuestionBox에 대한 애니메이션 상태
}

// 상태 관리 인터페이스
interface QuestionState {
  isAnswerVisible: boolean
  isBoxHighlighted: boolean
  animationState: 'scale-up' | 'scale-out' | 'none' // 애니메이션 상태 추가
  questionBoxes: QuestionBox[] // 질문 박스 리스트 타입
  selectedQuestion: QuestionBox | null // 선택된 질문
  isDisplayed: boolean
  toggleAnswerVisibility: (id: number) => void
  toggleBoxHighlight: () => void
  addQuestionBox: (content: string) => void // 새로운 질문 내용을 인자로 받도록 수정
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
  animationState: 'none', // 초기 애니메이션 상태
  questionBoxes: [],
  selectedQuestion: null, // 선택된 질문 저장
  isDisplayed: false, // AnswerBox display 상태 관리

  setAnswerVisibility: (visible) => set({ isAnswerVisible: visible }),

  setAnimationState: (state) => {
    set({ animationState: state })

    // 'scale-out' 상태일 때 500ms 뒤에 isDisplayed를 false로 설정
    if (state === 'scale-out') {
      setTimeout(() => {
        set({ isDisplayed: false })
      }, 500) // 500ms 후 실행
    }
  },

  // 특정 QuestionBox의 AnswerBox 보이기/숨기기
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

  // 질문 박스 추가
  addQuestionBox: (content: string) =>
    set((state) => ({
      questionBoxes: [
        {
          id: Date.now(), // 여기서 실제 질문 ID를 설정하도록 수정할 필요가 있음
          content,
          isAnswerVisible: false,
          animationState: 'none',
          createdAt: new Date(), // 현재 날짜로 설정
        },
        ...state.questionBoxes,
      ],
    })),

  // 선택된 질문을 설정
  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  // 선택된 질문 초기화
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
      // 새 질문을 서버로부터 받아옵니다.
      const response = await FetchFamilyNewQuestions()

      // 받아온 familyQuestionId가 있으면 기존 질문 리스트를 다시 패치합니다.
      if (response.familyQuestionId) {
        await useQuestionStore.getState().fetchQuestions(0, 10) // 페이지와 사이즈를 전달
      }
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    }
  },
}))

export default useQuestionStore
