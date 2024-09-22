import styled from '@emotion/styled'
import { useFetchQuestions } from '../hooks/useFetchQuestions'
import { useCheckAnswers } from '../hooks/useCheckAnswers'
import useQuestionStore from '../stores/UseQuestionStore'
import Header from '../components/common/Header'
import FamilyInfoBox from '../components/home/FamilyInfoBox'
import GetQuestionBtn from '../components/home/GetQuestionBtn'
import QuestionBox from '../components/home/QuestionBox'
import AnswerBox from '../components/home/AnswerBox'
import { loadFamilyId } from '../utils/UserToken'

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

const familyId = loadFamilyId()

function Home() {
  useFetchQuestions(Number(familyId))
  useCheckAnswers()

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
