import styled from '@emotion/styled'
import Header from '../components/Header'
import FamilyBox from '../components/FamilyBox'
import GetQuestionBtn from '../components/GetQuestionBtn'
import QuestionBox from '../components/QuestionBox'
import AnswerBox from '../components/AnswerBox'
import useQuestionStore from '../stores/UseQuestionStore'

const QuestionListContainer = styled.div`
  position: absolute;
  left: 629px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 각 질문 박스 간의 간격 */
`

const QuestionAnswerBox = styled.div`
  position: relative;
  width: auto;
  height: auto;
`

function Home() {
  const { questionBoxes, selectedQuestion, animationState } = useQuestionStore(
    (state) => ({
      questionBoxes: state.questionBoxes,
      selectedQuestion: state.selectedQuestion,
      animationState: state.animationState,
    })
  )

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
