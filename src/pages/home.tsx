import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Header from '../components/Header'
import FamilyInfoBox from '../components/FamilyInfoBox'
import GetQuestionBtn from '../components/GetQuestionBtn'
import QuestionBox from '../components/QuestionBox'
import AnswerBox from '../components/AnswerBox'
import useQuestionStore from '../stores/UseQuestionStore'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'
import UseAnswerStore from '../stores/UseAnswerStore'
import { UseFamilyStore } from '../stores/UseFamilyStore'
import { FetchFamilyAnswers } from '../services/GetFamilyAnswerApi'
import { FetchFamilyData } from '../services/GetFamilyApi'
import { FetchFamilyAnswersResponse } from '../model/FamilyAnswerResponse'

const HeaderHeight = 150

const Main = styled.div`
  --header-height: ${HeaderHeight}px;
  height: calc(100vh - var(--header-height));
  overflow: auto;
`

const QuestionListContainer = styled.div`
  position: absolute;
  max-height: 660px;
  height: auto;
  top: ${HeaderHeight}px;
  left: 43.6vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
`

const QuestionAnswerBox = styled.div`
  position: relative;
  max-height: 524px;
  width: auto;
  height: auto;
`

function Home() {
  const hasFetched = useRef(false)
  const { fetchQuestions, questionBoxes, selectedQuestion, animationState } =
    useQuestionStore((state) => ({
      fetchQuestions: state.fetchQuestions,
      questionBoxes: state.questionBoxes,
      selectedQuestion: state.selectedQuestion,
      animationState: state.animationState,
    }))

  const { answers } = UseAnswerStore()
  const { familyMembers, setMyName, setFamilyMembers } = UseFamilyStore()

  const { activate, setActivate } = UseGetQuestionBtnStore((state) => ({
    activate: state.activate,
    setActivate: state.setActivate,
  }))

  useEffect(() => {
    const familyId = localStorage.getItem('familyId')

    if (familyId && !hasFetched.current) {
      FetchFamilyData(Number(familyId))
        .then((data) => {
          setMyName(data.myName)
          setFamilyMembers(data.familyMembers)
        })
        .catch((error) => {
          console.error('Error fetching family data:', error)
        })

      fetchQuestions(Number(familyId), 0, 45)

      hasFetched.current = true
    }
  }, [])

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
  }, [
    questionBoxes,
    familyMembers,
    answers,
    activate,
    setActivate,
    setMyName,
    setFamilyMembers,
  ])

  return (
    <>
      <Header />
      <Main>
        <FamilyInfoBox />
        <GetQuestionBtn />
        <QuestionListContainer>
          {questionBoxes.reverse().map((question, index) => (
            <QuestionAnswerBox key={question.id}>
              <QuestionBox
                content={question.content}
                id={question.id}
                index={questionBoxes.length - index}
              />
              {(selectedQuestion?.id === question.id ||
                animationState === 'scale-out') && (
                <AnswerBox id={question.id} />
              )}
            </QuestionAnswerBox>
          ))}
        </QuestionListContainer>
      </Main>
    </>
  )
}

export default Home
