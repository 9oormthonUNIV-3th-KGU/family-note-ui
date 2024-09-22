import { create } from 'zustand'
import {
  FetchFamilyQuestions,
  FetchFamilyNewQuestions,
} from '../services/family-questions'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'
import {
  QuestionApiResponse,
  QuestionBox,
  QuestionState,
} from '../model/FamilyQuestionModel'

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

  setQuestions: (questions: QuestionBox[]) => set({ questionBoxes: questions }),

  fetchQuestions: async (familyId: number, page: number, size: number) => {
    try {
      const result = await FetchFamilyQuestions(familyId, page, size)

      if (result === 'no question') {
        const { setActivate } = UseGetQuestionBtnStore.getState()
        setActivate()
        return
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
}))

export default useQuestionStore
