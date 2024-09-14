import { useEffect } from 'react'
import styled from '@emotion/styled'
import useQuestionStore from '../stores/useQuestionStore'

const Box = styled.div<{ backgroundColor?: string }>`
  position: relative;
  width: 591px;
  height: 116px;
  left: 0px;
  top: 0px;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 31px;
`

const QuestionInfo = styled.div`
  position: absolute;
  width: 390px;
  height: 60px;
  left: 26px;
  top: 28px;
`

const QuestionTitle = styled.p`
  position: absolute;
  width: 390px;
  height: 33px;
  margin: 0;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;
  color: #000000;
`

const QuestionNum = styled.p`
  position: absolute;
  width: 30px;
  height: 24px;
  left: 73px;
  top: 36px;
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
  width: 65px;
  height: 24px;
  top: 36px;
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

const QuestionViewBtn = styled.svg`
  position: absolute;
  width: 23px;
  height: 12px;
  fill: none;
  left: 495px;
  top: 26px;
  display: flex;
  cursor: pointer;
`

interface QuestionBoxProps {
  content: string
  id: number
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ content, id }) => {
  const {
    isBoxHighlighted,
    toggleBoxHighlight,
    toggleAnswerVisibility,
    animationState,
    setAnimationState,
    selectedQuestion,
    setSelectedQuestion,
    clearSelectedQuestion,
  } = useQuestionStore((state) => ({
    isBoxHighlighted: state.isBoxHighlighted,
    toggleBoxHighlight: state.toggleBoxHighlight,
    toggleAnswerVisibility: state.toggleAnswerVisibility,
    animationState: state.animationState,
    setAnimationState: state.setAnimationState,
    selectedQuestion: state.selectedQuestion,
    setSelectedQuestion: state.setSelectedQuestion,
    clearSelectedQuestion: state.clearSelectedQuestion,
  }))

  const handleClick = () => {
    if (selectedQuestion?.id === id) {
      clearSelectedQuestion()
      setTimeout(() => {
        toggleAnswerVisibility()
      }, 0)
    } else {
      setSelectedQuestion({ id, content })
      setTimeout(() => {
        toggleAnswerVisibility()
      }, 0)
    }
  }

  //const handleClick = () => {
  //  console.log(animationState)
  //  toggleAnswerVisibility()
  //}

  //useEffect(() => {
  //  console.log('Animation state changed:', animationState)
  //}, [animationState])
  useEffect(() => {
    console.log('Animation state changed:', animationState)
    console.log('Selected Question:', selectedQuestion)
    if (animationState === 'scale-out') {
      const timer = setTimeout(() => {
        toggleBoxHighlight()
      }, 500) // scale-out 애니메이션 시간이랑 맞추기
      return () => clearTimeout(timer)
    } else if (animationState === 'scale-up') {
      toggleBoxHighlight()
    }
  }, [animationState, toggleBoxHighlight])

  return (
    <Box
      backgroundColor={
        isBoxHighlighted ? 'rgba(255, 206, 48, 1)' : 'rgba(255, 206, 48, 0.6)'
      }
    >
      <QuestionInfo>
        <QuestionDate>24.08.27</QuestionDate>
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
