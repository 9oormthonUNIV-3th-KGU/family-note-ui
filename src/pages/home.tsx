import { useEffect } from 'react'
import styled from '@emotion/styled'
import Header from '../components/Header'
import FamilyBox from '../components/FamilyBox'
import GetQuestionBtn from '../components/GetQuestionBtn'
import QuestionBox from '../components/QuestionBox'
import AnswerBox from '../components/AnswerBox'
import useQuestionStore from '../stores/UseQuestionStore'

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
  const { fetchQuestions, questionBoxes, selectedQuestion, animationState } =
    useQuestionStore((state) => ({
      fetchQuestions: state.fetchQuestions,
      questionBoxes: state.questionBoxes,
      selectedQuestion: state.selectedQuestion,
      animationState: state.animationState,
    }))

  useEffect(() => {
    fetchQuestions(0, 45)
  }, [fetchQuestions])

  return (
    <>
      <Header />
      <Main>
        <FamilyBox />
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
