export interface QuestionApiResponse {
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

export interface QuestionBox {
  id: number
  content: string
  createdAt: Date
  isAnswerVisible: boolean
  animationState: 'scale-up' | 'scale-out' | 'none'
}

export interface QuestionState {
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
  setQuestions: (questions: QuestionBox[]) => void
}
