import { useEffect } from 'react'
import styled from '@emotion/styled'
import useQuestionStore from '../stores/UseQuestionStore'
import FormatDate from '../utils/FormatDate'

const Box = styled.div<{ backgroundColor?: string }>`
  position: relative;
  width: 591px;
  height: 116px;
  left: 0px;
  top: 0px;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 31px;
  z-index: 1;
`

const QuestionInfo = styled.div`
  position: absolute;
  width: auto;
  min-width: 390px;
  max-width: 421px;
  height: 82px;
  left: 26px;
  top: 17px;
  display: inline-block;
`

const QuestionTitle = styled.p`
  width: fit-content;
  height: auto;
  margin: 0;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 130%;
  display: flex;
  align-items: center;
  text-align: left;
  letter-spacing: -0.011em;
  color: #000000;
`

const QuestionNum = styled.p`
  position: absolute;
  width: 30px;
  height: 24px;
  left: 88px;
  top: 64px;
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;
  color: #000000;
`

const QuestionDate = styled.p`
  position: absolute;
  width: 80px;
  height: 24px;
  top: 64px;
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;
  color: #000000;
  white-space: nowrap;
`

const QuestionViewBtn = styled.svg`
  position: absolute;
  width: 23px;
  height: 12px;
  fill: none;
  left: 495px;
  top: 37px;
  display: flex;
  cursor: pointer;
`

interface QuestionBoxProps {
  content: string
  id: number
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ content, id }) => {
  const {
    questionBoxes,
    toggleAnswerVisibility,
    setAnimationState,
    selectedQuestion,
    setSelectedQuestion,
    clearSelectedQuestion,
    isDisplayed,
    setIsDisplayed,
  } = useQuestionStore((state) => ({
    questionBoxes: state.questionBoxes,
    toggleAnswerVisibility: state.toggleAnswerVisibility,
    setAnimationState: state.setAnimationState,
    selectedQuestion: state.selectedQuestion,
    setSelectedQuestion: state.setSelectedQuestion,
    clearSelectedQuestion: state.clearSelectedQuestion,
    isDisplayed: state.isDisplayed,
    setIsDisplayed: state.setIsDisplayed,
  }))

  const isHighlighted = selectedQuestion?.id === id
  const currentQuestion = questionBoxes.find((question) => question.id === id)

  const handleClick = () => {
    if (isHighlighted) {
      // 현재 선택된 질문을 닫기
      setAnimationState('scale-out')
      setTimeout(() => {
        toggleAnswerVisibility(id)
        clearSelectedQuestion() // 선택된 질문 해제
      }, 0)
    } else {
      if (currentQuestion) {
        // 다른 질문을 클릭하면 기존 선택을 클리어하고 새 질문 선택
        setIsDisplayed(true)
        setSelectedQuestion(currentQuestion)
        setTimeout(() => {
          toggleAnswerVisibility(id)
        }, 0)
      }
    }
  }

  useEffect(() => {
    console.log('question-currentQuestion: ', id)
    console.log('question-id: ', currentQuestion?.id)
    console.log(currentQuestion?.animationState)
    console.log(isDisplayed) // 이 값이 true인지 확인
    if (currentQuestion?.animationState === 'scale-out') {
      setTimeout(() => {
        clearSelectedQuestion()
      }, 500)
    }
  }, [currentQuestion?.animationState, clearSelectedQuestion, isDisplayed])

  return (
    <Box
      backgroundColor={
        isHighlighted ? 'rgba(255, 206, 48, 1)' : 'rgba(255, 206, 48, 0.6)'
      }
    >
      <QuestionInfo>
        <QuestionDate>
          {currentQuestion ? FormatDate(currentQuestion.createdAt) : ''}
        </QuestionDate>
        <QuestionNum>#24</QuestionNum>
        <QuestionTitle>{content}</QuestionTitle>
        <QuestionViewBtn
          viewBox="0 0 23 12"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <path
            d="M2 2L11.5 10"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M21 2L11.5 10"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </QuestionViewBtn>
      </QuestionInfo>
    </Box>
  )
}

export default QuestionBox
