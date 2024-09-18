import styled from '@emotion/styled'
import useAnswerStore from '../stores/UseAnswerModalStore'
import useQuestionStore from '../stores/UseQuestionStore'
import { PostFamilyAnswer } from '../services/FamilyAnswerApi'

const AnswerModalBackground = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  width: 1440px;
  height: 1024px;
  left: 0px;
  top: 0px;

  background-color: rgb(0, 0, 0, 0.61);
  z-index: 2;
`

const AnswerModalBox = styled.div`
  position: absolute;
  width: 812px;
  height: 485px;
  left: calc(50% - 812px / 2);
  top: calc(50% - 485px / 2 + 0.5px);

  background: #ffffff;
  border-radius: 34px;
`
const AnswerModalClose = styled.svg`
  position: absolute;
  top: 32px;
  left: 756px;
  width: 28px;
  height: 28px;
  fill: none;
  cursor: pointer;
`

const AnswerBtnBox = styled.div`
  position: absolute;
  width: 226px;
  height: 82px;
  left: 0px;
  top: 0px;
`

const AnswerBtnTxt = styled.p<{ isExceedingLimit: boolean }>`
  position: absolute;
  width: 103px;
  height: 45px;
  left: 620px;
  top: 393px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 150%;
  /* identical to box height, or 45px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #ffffff;
  cursor: ${({ isExceedingLimit }) =>
    isExceedingLimit ? 'not-allowed' : 'pointer'};
`

const AnswerBtn = styled.button<{ isExceedingLimit: boolean }>`
  position: absolute;
  width: 226px;
  height: 82px;
  left: 558px;
  top: 375px;

  background: ${({ isExceedingLimit }) =>
    isExceedingLimit ? '#EDEDED' : '#ffa800'};
  border-radius: 24px;
  border: 0;
  border-color: transparent;
  cursor: ${({ isExceedingLimit }) => (isExceedingLimit ? 'not-allowed' : '')};
`
const Qustion = styled.p`
  position: absolute;
  width: 45px;
  height: 39px;
  left: 36px;
  top: 28px;
  margin: 0px;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 150%;
  /* identical to box height, or 39px */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #8c8c8c;
`

const QuestionContent = styled.p`
  position: absolute;
  max-width: 621px;
  max-height: 78px;
  width: auto;
  height: auto;
  left: 101px;
  top: 28px;
  margin: 0px;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  /* identical to box height, or 39px */
  display: flex;
  align-items: center;
  text-align: left;
  letter-spacing: -0.011em;

  color: #000000;
`

const Answer = styled.p`
  position: absolute;
  width: 45px;
  height: 39px;
  left: 36px;
  top: 128px;
  margin: 0px;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 150%;
  /* identical to box height, or 39px */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #8c8c8c;
`

const AnswerContent = styled.textarea`
  position: absolute;
  width: 622px;
  height: 156px;
  left: 101px;
  top: 128px;
  margin: 0px;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  letter-spacing: -0.011em;

  border: none;
  outline: none;
  resize: none;
  background: none;

  color: #000000;
`

const AnswerCount = styled.p<{ isExceedingLimit: boolean }>`
  position: absolute;
  width: 100px;
  height: 30px;
  left: 678px;
  top: 298px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  /* identical to box height, or 30px */
  display: flex;
  align-items: center;
  text-align: center;

  color: ${({ isExceedingLimit }) => (isExceedingLimit ? 'red' : '#868686')};
`

function AnswerModal({
  content,
  familyQuestionId,
}: {
  content: string
  familyQuestionId: number
}) {
  const { isOpen, toggleModal, answer, setAnswer } = useAnswerStore()
  const { fetchQuestions, clearSelectedQuestion } = useQuestionStore(
    (state) => ({
      fetchQuestions: state.fetchQuestions,
      clearSelectedQuestion: state.clearSelectedQuestion,
    })
  )

  const handlePostAnswer = async () => {
    if (answer.length > 100)
      return alert('100자 이하의 답변만 입력 가능합니다.')

    try {
      await PostFamilyAnswer(familyQuestionId, answer)
      alert('답변이 성공적으로 제출되었습니다.')
      toggleModal()
      clearSelectedQuestion()
      await fetchQuestions(0, 10)
    } catch (error) {
      alert('답변 제출 중 오류가 발생했습니다.')
    }
  }

  return (
    <AnswerModalBackground isOpen={isOpen}>
      <AnswerModalBox>
        <AnswerModalClose
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleModal}
        >
          <path
            d="M0.768456 0.768456C1.2607 0.276822 1.92796 0.000675996 2.62367 0.000675996C3.31938 0.000675996 3.98664 0.276822 4.47889 0.768456L14 10.2861L23.5211 0.768456C23.7647 0.524825 24.054 0.331567 24.3723 0.199715C24.6906 0.0678631 25.0318 6.79182e-09 25.3763 0C25.7209 -6.79181e-09 26.062 0.0678631 26.3804 0.199715C26.6987 0.331567 26.9879 0.524825 27.2315 0.768456C27.4752 1.01209 27.6684 1.30132 27.8003 1.61964C27.9321 1.93795 28 2.27913 28 2.62367C28 2.96822 27.9321 3.30939 27.8003 3.62771C27.6684 3.94603 27.4752 4.23526 27.2315 4.47889L17.7139 14L27.2315 23.5211C27.7236 24.0131 28 24.6805 28 25.3763C28 26.0722 27.7236 26.7395 27.2315 27.2315C26.7395 27.7236 26.0722 28 25.3763 28C24.6805 28 24.0131 27.7236 23.5211 27.2315L14 17.7139L4.47889 27.2315C3.98685 27.7236 3.31951 28 2.62367 28C1.92783 28 1.26049 27.7236 0.768456 27.2315C0.276422 26.7395 0 26.0722 0 25.3763C0 24.6805 0.276422 24.0131 0.768456 23.5211L10.2861 14L0.768456 4.47889C0.276822 3.98664 0.000675996 3.31938 0.000675996 2.62367C0.000675996 1.92796 0.276822 1.2607 0.768456 0.768456Z"
            fill="black"
          />
        </AnswerModalClose>
        <Qustion>질문</Qustion>
        <QuestionContent>{content}</QuestionContent>
        <Answer>답변</Answer>
        <AnswerContent
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></AnswerContent>
        <AnswerCount isExceedingLimit={answer.length > 100}>
          {answer.length} / 100
        </AnswerCount>
        <AnswerBtnBox onClick={handlePostAnswer}>
          <AnswerBtn isExceedingLimit={answer.length > 100} />
          <AnswerBtnTxt isExceedingLimit={answer.length > 100}>
            답변하기
          </AnswerBtnTxt>
        </AnswerBtnBox>
      </AnswerModalBox>
    </AnswerModalBackground>
  )
}

export default AnswerModal
