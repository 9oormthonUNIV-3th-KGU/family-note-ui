import { create } from 'zustand'

interface GetQuestionBtnState {
  activate: boolean
  setActivate: () => void
}

const UseGetQuestionBtnStore = create<GetQuestionBtnState>((set) => ({
  activate: false,
  setActivate: () => set((state) => ({ activate: !state.activate })),
}))

export default UseGetQuestionBtnStore
