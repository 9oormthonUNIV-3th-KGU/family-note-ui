import { create } from 'zustand'

interface Family {
  familyId: number
  familyName: string
  myName: string
  familyMembers: Array<{
    familyMemberId: number
    nickName: string
    role: string | null
  }>
}

interface FamilyState {
  families: Family[]
  setFamilies: (families: Family[]) => void
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
  hoveredFamilyId: number | null
  setHoveredFamilyId: (id: number | null) => void
}

export const UseFamilyStore = create<FamilyState>((set) => ({
  families: [],
  setFamilies: (families) => set({ families }),
  myName: '',
  familyMembers: [],
  setMyName: (name) => set({ myName: name }),
  setFamilyMembers: (members) => set({ familyMembers: members }),
  hoveredFamilyId: null,
  setHoveredFamilyId: (id) => set({ hoveredFamilyId: id }),
}))
