import styled from '@emotion/styled'
import { css } from '@emotion/react'
import AnswerModal from './AnswerModal'
import useQuestionStore from '../stores/UseQuestionStore'
import UseAnswerModalStore from '../stores/UseAnswerModalStore'
import { UseFamilyStore } from '../stores/UseFamilyStore'
import UseAnswerStore from '../stores/UseAnswerStore'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'

const Box = styled.div<{
  animationState: 'none' | 'scale-up' | 'scale-out'
  isDisplayed: boolean
}>`
  position: relative;
  width: 591px;
  height: 462px;
  left: 0px;
  top: -54px;

  background: rgba(255, 206, 48, 0.57);
  border-radius: 26px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
  transition: opacity 0.5s, transform 0.5s;

  display: ${(props) => (props.isDisplayed ? 'flex' : 'none')};
  opacity: ${(props) => (props.animationState === 'none' ? 0 : 1)};
  transform: ${(props) =>
    props.animationState === 'scale-out' ? 'scale(0.5)' : 'scale(1)'};

  ${(props) =>
    props.animationState === 'scale-up' &&
    css`
      animation: scale-up-ver-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    `}

  ${(props) =>
    props.animationState === 'scale-out' &&
    css`
      animation: scale-out-ver-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
        both;
    `}
`

const AnswererBox = styled.div`
  position: relative;
  max-height: 114px;
  min-height: 91px;
  width: 539px;
  height: auto;
  top: 76px;

  &:last-of-type {
    padding-bottom: 22px;
  }
`

const Answerer = styled.p`
  position: relative;
  width: 116px;
  height: 30px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #000000;
`

const Answer = styled.p`
  position: relative;
  max-height: 84px;
  width: 539px;
  height: auto;
  top: 0px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 110%;
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #000000;
`

const Blur = styled.div`
  position: absolute;
  width: 591px;
  height: calc(100% - 98px);
  left: 0;
  top: 167px;

  background: rgba(255, 206, 48, 0.07);
  backdrop-filter: blur(11.55px);
  z-index: 1;
`

const BlurSvg = styled.svg`
  position: absolute;
  width: 63px;
  height: 63px;
  top: 88px;
  left: 264px;
`

const BlurTxt = styled.p`
  position: absolute;
  width: 229px;
  height: 52px;
  left: 181px;
  top: 151px;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 131%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #000000;
`

interface AnswerBoxProps {
  id: number
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ id }) => {
  const { isDisplayed, questionBoxes, selectedQuestion } = useQuestionStore(
    (state) => ({
      isDisplayed: state.isDisplayed,
      questionBoxes: state.questionBoxes,
      selectedQuestion: state.selectedQuestion,
    })
  )
  const { answers } = UseAnswerStore()
  const { familyMembers, myName } = UseFamilyStore()
  const { toggleModal } = UseAnswerModalStore()
  const { setActivate } = UseGetQuestionBtnStore()
  const currentQuestion = questionBoxes.find((question) => question.id === id)
  const myAnswer = answers.find((answer) => answer.nickname === myName)
  const hasMyAnswer = !!myAnswer
  const isCurrentQuestion = selectedQuestion?.id === id

  // 가장 최신 질문 가져오기
  const mostRecentQuestion = questionBoxes[0]

  // 현재 질문이 가장 최신 질문인지 확인
  const isMostRecentQuestion =
    mostRecentQuestion && currentQuestion?.id === mostRecentQuestion.id

  // 가장 최신 질문에 대해 모든 가족 구성원이 답변을 제출했는지 확인
  const allAnswered = isMostRecentQuestion
    ? familyMembers.every((member) =>
        answers.some(
          (answer) => answer.nickname === member.nickName && answer.content
        )
      )
    : false

  // 조건이 충족되면 setActivate 호출
  if (isMostRecentQuestion && allAnswered) {
    setActivate()
  }

  return (
    <>
      <Box
        animationState={currentQuestion?.animationState || 'none'}
        isDisplayed={isCurrentQuestion && isDisplayed}
      >
        {familyMembers
          .slice()
          .sort((a, b) =>
            a.nickName === myName ? -1 : b.nickName === myName ? 1 : 0
          )
          .map((member) => {
            const answer = answers.find(
              (answer) => answer.nickname === member.nickName
            )

            const isMyself = member.nickName === myName

            return (
              <AnswererBox
                key={member.familyMemberId}
                onClick={isMyself && !answer ? toggleModal : undefined}
              >
                <Answerer>{member.nickName}</Answerer>
                <Answer
                  css={css({
                    cursor: answer
                      ? answer.content
                      : isMyself
                      ? 'pointer'
                      : 'default',
                  })}
                >
                  {answer
                    ? answer.content
                    : isMyself
                    ? '이곳을 눌러서 답변을 작성해 주세요'
                    : '아직 답변을 작성하지 않았어요'}
                </Answer>
              </AnswererBox>
            )
          })}

        {!hasMyAnswer && (
          <>
            <Blur>
              <BlurSvg
                viewBox="0 0 63 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 57.75C14.3062 57.75 13.0707 57.2364 12.0435 56.2091C11.0162 55.1819 10.5017 53.9455 10.5 52.5V26.25C10.5 24.8063 11.0145 23.5708 12.0435 22.5435C13.0725 21.5163 14.308 21.0018 15.75 21H18.375V15.75C18.375 12.1188 19.6551 9.02388 22.2154 6.46538C24.7756 3.90688 27.8705 2.62675 31.5 2.625C35.1295 2.62325 38.2253 3.90338 40.7873 6.46538C43.3493 9.02738 44.6285 12.1223 44.625 15.75V21H47.25C48.6937 21 49.9301 21.5145 50.9591 22.5435C51.9881 23.5725 52.5018 24.808 52.5 26.25V52.5C52.5 53.9437 51.9864 55.1801 50.9591 56.2091C49.9319 57.2381 48.6955 57.7518 47.25 57.75H15.75ZM31.5 44.625C32.9438 44.625 34.1801 44.1114 35.2091 43.0841C36.2381 42.0569 36.7518 40.8205 36.75 39.375C36.7482 37.9295 36.2346 36.694 35.2091 35.6685C34.1836 34.643 32.9473 34.1285 31.5 34.125C30.0527 34.1215 28.8173 34.636 27.7935 35.6685C26.7698 36.701 26.2552 37.9365 26.25 39.375C26.2448 40.8135 26.7593 42.0499 27.7935 43.0841C28.8278 44.1184 30.0632 44.632 31.5 44.625ZM23.625 21H39.375V15.75C39.375 13.5625 38.6094 11.7031 37.0781 10.1719C35.5469 8.64063 33.6875 7.875 31.5 7.875C29.3125 7.875 27.4531 8.64063 25.9219 10.1719C24.3906 11.7031 23.625 13.5625 23.625 15.75V21Z"
                  fill="black"
                />
              </BlurSvg>
              <BlurTxt>
                가족들의 답변이 궁금하다면 ? 오늘의 질문에 답해주세요 !
              </BlurTxt>
            </Blur>
          </>
        )}
      </Box>
      {selectedQuestion?.id && (
        <AnswerModal
          content={selectedQuestion?.content}
          familyQuestionId={selectedQuestion?.id}
        />
      )}
    </>
  )
}

export default AnswerBox
