import { create } from 'zustand'
import {
  FetchFamilyQuestions,
  FetchFamilyNewQuestions,
} from '../services/GetFamilyQuestionApi'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'
import { UseFamilyStore } from './UseFamilyStore'
import UseAnswerStore from './UseAnswerStore'

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
  //hasQuestion: boolean
  //initialized: boolean
  //latestQuestionDate: Date | null
  //setLatestQuestionDate: (date: Date) => void
  toggleAnswerVisibility: (id: number) => void
  toggleBoxHighlight: () => void
  //addQuestionBox: (content: string) => void
  setAnswerVisibility: (visible: boolean) => void
  setAnimationState: (state: 'none' | 'scale-up' | 'scale-out') => void
  setSelectedQuestion: (question: QuestionBox) => void
  clearSelectedQuestion: () => void
  setIsDisplayed: (state: boolean) => void
  fetchQuestions: (page: number, size: number) => void
  fetchNewQuestions: () => void
  setIsFetching: (value: boolean) => void
  //setHasQuestion: (hasQuestion: boolean) => void
  //setInitialized: (state: boolean) => void
}

const useQuestionStore = create<QuestionState>((set) => ({
  isAnswerVisible: false,
  isBoxHighlighted: false,
  animationState: 'none',
  questionBoxes: [],
  selectedQuestion: null,
  isDisplayed: false,
  isFetching: false,
  //hasQuestion: false,
  //initialized: false,
  //latestQuestionDate: null,

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

  //addQuestionBox: (content: string) =>
  //  set((state) => ({
  //    questionBoxes: [
  //      {
  //        id: Date.now(),
  //        content,
  //        isAnswerVisible: false,
  //        animationState: 'none',
  //        createdAt: new Date(),
  //      },
  //      ...state.questionBoxes,
  //    ],
  //  })),

  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  clearSelectedQuestion: () => set({ selectedQuestion: null }),

  setIsDisplayed: (newState) => set({ isDisplayed: newState }),

  fetchQuestions: async (page: number, size: number) => {
    try {
      const result = await FetchFamilyQuestions(page, size)

      if (result === 'no question') {
        // result가 true일 때 setActivate() 호출
        const { setActivate } = UseGetQuestionBtnStore.getState()
        setActivate()
        return // 추가적으로 처리를 종료할 수도 있습니다.
      }

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
    } catch (error) {
      console.error('질문을 가져오는 중 오류 발생:', error)
    }
  },

  fetchNewQuestions: async () => {
    //const { hasQuestion } = useQuestionStore.getState()

    //if (hasQuestion) {
    //  console.log('오늘 할당된 질문이 존재합니다.')
    //  return
    //} else {
    //  try {
    //    const response = await FetchFamilyNewQuestions()
    //    if (response.familyQuestionId) {
    //      await useQuestionStore.getState().fetchQuestions(0, 45)
    //      set({ hasQuestion: true })
    //      console.log('새로운 질문을 성공적으로 받아왔습니다.')
    //    }
    //  } catch (error) {
    //    console.error('새 질문을 받아오는 데 실패했습니다.', error)
    //  }
    //}

    try {
      const response = await FetchFamilyNewQuestions()
      if (response.familyQuestionId) {
        await useQuestionStore.getState().fetchQuestions(0, 45)
        //set({ hasQuestion: true })
        console.log('새로운 질문을 성공적으로 받아왔습니다.')
      }
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    }
  },

  setIsFetching: (value) => set({ isFetching: value }),
  //setHasQuestion: (hasQuestion: boolean) => set({ hasQuestion }),
  //setInitialized: (state: boolean) => set({ initialized: state }),
  //setLatestQuestionDate: (date) => set({ latestQuestionDate: date }),
}))

export default useQuestionStore
