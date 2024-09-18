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

  background: #ffa800;
  border-radius: 20px;
  border: 0;
  border-color: transparent;
`

const GetSvg = styled.svg`
  position: absolute;
  width: 42px;
  height: 42px;
  top: 41px;
  left: 50px;
  fill: none;
`

const GetQuestionTxt = styled.p`
  position: absolute;
  width: 219px;
  height: 51px;
  left: 106px;
  top: 0px;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 150%;
  /* identical to box height, or 51px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #ffffff;
`

function GetQuestionBtn() {
  const { fetchNewQuestions, isFetching, setIsFetching } = useQuestionStore(
    (state) => ({
      fetchNewQuestions: state.fetchNewQuestions,
      isFetching: state.isFetching,
      setIsFetching: state.setIsFetching,
    })
  )

  const getQuestion = async () => {
    if (isFetching) return
    setIsFetching(true)
    try {
      await fetchNewQuestions()
      console.log('새로운 질문을 성공적으로 받아왔습니다.')
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    } finally {
      setIsFetching(false)
    }
  }

  const setDailyQuestionFetch = () => {
    const now = new Date()
    const nextFetch = new Date()

    nextFetch.setHours(0, 0, 0, 0)

    if (now > nextFetch) {
      nextFetch.setDate(nextFetch.getDate() + 1)
    }

    const timeUntilNextFetch = nextFetch.getTime() - now.getTime()

    setTimeout(() => {
      getQuestion()

      setInterval(getQuestion, 86400000)
    }, timeUntilNextFetch)
  }

  useEffect(() => {
    setDailyQuestionFetch()
  }, [])

  return (
    <GetQuestion onClick={getQuestion}>
      <GetSvg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 4V38M4 21H38"
          stroke="white"
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
