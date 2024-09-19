import { useEffect } from 'react'
import styled from '@emotion/styled'
import useQuestionStore from '../stores/UseQuestionStore'

const GetQuestion = styled.button`
  position: absolute;
  width: 388px;
  height: 116px;
  left: 14.44vw;
  top: 694px;
  padding: 0;

  background: #ffffff;
  border-radius: 20px;
  border: 5px solid #ffa800;

  &:hover {
    background: #ffa800;
    svg path {
      stroke: #ffffff;
    }

    p {
      color: #ffffff;
    }
  }
`

const GetSvg = styled.svg`
  position: absolute;
  width: 42px;
  height: 42px;
  left: 12.89%;
  right: 78.35%;
  top: 30%;
  bottom: 35.34%;
  fill: none;
`

const GetQuestionTxt = styled.p`
  position: absolute;
  width: 219px;
  height: 51px;
  left: 27.32%;
  right: 16.24%;
  top: 27.59%;
  bottom: 28.45%;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #ffa800;
`

function GetQuestionBtn() {
  const {
    fetchNewQuestions,
    isFetching,
    setIsFetching,
    hasQuestion,
    setHasQuestion,
    initialized,
    setInitialized,
    //setLatestQuestionDate,
  } = useQuestionStore((state) => ({
    fetchNewQuestions: state.fetchNewQuestions,
    isFetching: state.isFetching,
    setIsFetching: state.setIsFetching,
    hasQuestion: state.hasQuestion,
    setHasQuestion: state.setHasQuestion,
    initialized: state.initialized,
    setInitialized: state.setInitialized,
    //latestQuestionDate: state.latestQuestionDate,
    //setLatestQuestionDate: state.setLatestQuestionDate,
  }))

  const getQuestion = async () => {
    if (isFetching) return console.log('질문을 받아오는 중입니다.')
    if (hasQuestion) {
      console.log('오늘 할당된 질문이 존재합니다.')
      setIsFetching(false)
      return
    }

    try {
      await fetchNewQuestions()
      //const newDate = new Date()
      //setLatestQuestionDate(newDate)
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    } finally {
      setIsFetching(false)
    }
  }

  const resetHasQuestionDaily = () => {
    const now = new Date()
    const resetTime = new Date()

    resetTime.setHours(0, 10, 0, 0)
    if (now > resetTime) {
      resetTime.setDate(resetTime.getDate() + 1)
    }

    const timeUntilReset = resetTime.getTime() - now.getTime()

    setTimeout(() => {
      setHasQuestion(false)
      resetHasQuestionDaily()
    }, timeUntilReset)
  }

  const setDailyQuestionFetch = () => {
    const now = new Date()
    const nextFetch = new Date()

    nextFetch.setHours(0, 10, 0, 0)
    if (now > nextFetch) {
      nextFetch.setDate(nextFetch.getDate() + 1)
    }

    const timeUntilNextFetch = nextFetch.getTime() - now.getTime()

    setTimeout(() => {
      setIsFetching(true)
      setHasQuestion(true)
      getQuestion()
      resetHasQuestionDaily()
    }, timeUntilNextFetch)
  }

  useEffect(() => {
    if (!initialized) {
      setDailyQuestionFetch()
      setInitialized(false)
    }
    console.log(hasQuestion)
  }, [initialized, hasQuestion])

  return (
    <GetQuestion onClick={getQuestion}>
      <GetSvg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 4V38M4 21H38"
          stroke="#ffa800"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </GetSvg>
      <GetQuestionTxt>새 질문 받아오기</GetQuestionTxt>
    </GetQuestion>
  )
}

export default GetQuestionBtn
