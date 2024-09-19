import { FamilyAnswer } from './FamilyAnswer'

export interface FetchFamilyAnswersResponse {
  isAnswered: boolean
  contents: FamilyAnswer[]
}
