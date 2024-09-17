import { useEffect } from 'react'
import styled from '@emotion/styled'
import Header from '../components/Header'
import FamilyBox from '../components/FamilyBox'
import GetQuestionBtn from '../components/GetQuestionBtn'
import QuestionBox from '../components/QuestionBox'
import AnswerBox from '../components/AnswerBox'
import useQuestionStore from '../stores/UseQuestionStore'

const QuestionListContainer = styled.div`
  position: absolute;
  left: 43.6vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const QuestionAnswerBox = styled.div`
  position: relative;
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
    fetchQuestions(0, 10)
  }, [fetchQuestions])

  return (
    <>
      <Header />
      <FamilyBox />
      <GetQuestionBtn />
      <QuestionListContainer>
        {questionBoxes.reverse().map((question) => (
          <QuestionAnswerBox key={question.id}>
            <QuestionBox content={question.content} id={question.id} />
            {/* selectedQuestion의 id와 question의 id가 일치하면 AnswerBox 렌더링 */}
            {(selectedQuestion?.id === question.id ||
              animationState === 'scale-out') && (
              <AnswerBox content={question.content} id={question.id} />
            )}
          </QuestionAnswerBox>
        ))}
      </QuestionListContainer>
    </>
  )
}

export default Home
