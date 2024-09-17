import { create } from 'zustand'

interface FamilyState {
  myName: string
  familyMembers: Array<{
    familyMemberId: number
    nickName: string
    role: string | null
  }>
  setMyName: (name: string) => void
  setFamilyMembers: (
    members: Array<{
      familyMemberId: number
      nickName: string
      role: string | null
    }>
  ) => void
}

export const UseFamilyStore = create<FamilyState>((set) => ({
  myName: '',
  familyMembers: [],
  setMyName: (name) => set({ myName: name }),
  setFamilyMembers: (members) => set({ familyMembers: members }),
}))
