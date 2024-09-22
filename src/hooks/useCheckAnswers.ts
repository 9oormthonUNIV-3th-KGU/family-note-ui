import { useEffect } from 'react'
import { FetchFamilyAnswers } from '../services/GetFamilyAnswerApi'
import { FetchFamilyAnswersResponse } from '../model/FamilyAnswerResponse'
import { UseFamilyStore } from '../stores/UseFamilyStore'
import useQuestionStore from '../stores/UseQuestionStore'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'

export const useCheckAnswers = () => {
  const { questionBoxes } = useQuestionStore((state) => ({
    questionBoxes: state.questionBoxes,
  }))
  const { familyMembers } = UseFamilyStore()
  const { activate, setActivate } = UseGetQuestionBtnStore((state) => ({
    activate: state.activate,
    setActivate: state.setActivate,
  }))

  useEffect(() => {
    const checkAnswers = async () => {
      if (questionBoxes.length > 0) {
        const mostRecentQuestion = questionBoxes[0]
        try {
          const response: FetchFamilyAnswersResponse = await FetchFamilyAnswers(
            mostRecentQuestion.id
          )

          const { isAnswered, contents } = response

          if (isAnswered) {
            const answeredNicknames = contents.map(
              (content) => content.nickname
            )
            const allMembersAnswered = familyMembers.every((member) =>
              answeredNicknames.includes(member.nickName)
            )

            if (allMembersAnswered && !activate) {
              setActivate()
            }
          }
        } catch (error) {
          console.error('Error checking family answers:', error)
        }
      }
    }

    checkAnswers()
  }, [questionBoxes, familyMembers, activate, setActivate])
}
