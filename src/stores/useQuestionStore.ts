import { create } from 'zustand'

interface QuestionBox {
  id: number
  content: string
}

interface QuestionState {
  isAnswerVisible: boolean
  isBoxHighlighted: boolean
  animationState: 'scale-up' | 'scale-out' | 'none' // 애니메이션 상태 추가
  questionBoxes: QuestionBox[] // 질문 박스 리스트 타입
  selectedQuestion: QuestionBox | null // 선택된 질문
  isDisplayed: boolean
  toggleAnswerVisibility: () => void
  toggleBoxHighlight: () => void
  addQuestionBox: () => void
  setAnswerVisibility: (visible: boolean) => void
  setAnimationState: (state: 'none' | 'scale-up' | 'scale-out') => void
  setSelectedQuestion: (question: QuestionBox) => void
  clearSelectedQuestion: () => void
  setIsDisplayed: (state: boolean) => void
}

const useQuestionStore = create<QuestionState>((set) => ({
  isAnswerVisible: false,
  isBoxHighlighted: false,
  animationState: 'none', // 초기 애니메이션 상태
  questionBoxes: [],
  selectedQuestion: null, // 선택된 질문 저장
  isDisplayed: true, // AnswerBox display 상태 관리

  setAnswerVisibility: (visible) => set({ isAnswerVisible: visible }),

  setAnimationState: (state) => {
    set({ animationState: state })

    // 'scale-out' 상태일 때 5초 뒤에 isDisplayed를 false로 설정
    if (state === 'scale-out') {
      setTimeout(() => {
        set({ isDisplayed: false })
      }, 500) // 5초 후 실행
    }
  },
  toggleAnswerVisibility: () =>
    set((state) => {
      const newState = !state.isAnswerVisible
      return {
        isAnswerVisible: newState,
        animationState: newState ? 'scale-up' : 'scale-out',
      }
    }),

  toggleBoxHighlight: () =>
    set((state) => ({ isBoxHighlighted: !state.isBoxHighlighted })),

  addQuestionBox: () =>
    set((state) => ({
      questionBoxes: [
        { id: Date.now(), content: '새로운 질문' },
        ...state.questionBoxes,
      ],
    })),

  // 선택된 질문을 설정
  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  // 선택된 질문 초기화
  clearSelectedQuestion: () => set({ selectedQuestion: null }),

  setIsDisplayed: (newState) => set({ isDisplayed: newState }),
}))

export default useQuestionStore
