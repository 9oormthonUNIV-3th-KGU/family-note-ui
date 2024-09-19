import styled from '@emotion/styled'
import useQuestionStore from '../stores/UseQuestionStore'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'

const GetQuestion = styled.button<{ activate: boolean }>`
  position: absolute;
  width: 388px;
  height: 116px;
  left: 14.44vw;
  top: 694px;
  padding: 0;

  background: ${(props) => (props.activate ? '#ffa800' : '#ffffff')};
  border-radius: 20px;
  border: 5px solid #ffa800;
  cursor: ${(props) => (props.activate ? 'pointer' : 'not-allowed')};
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

const GetQuestionTxt = styled.p<{ activate: boolean }>`
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
  color: ${(props) => (props.activate ? '#ffffff' : '#ffa800')};
`

function GetQuestionBtn() {
  const { fetchNewQuestions, isFetching, setIsFetching } = useQuestionStore(
    (state) => ({
      fetchNewQuestions: state.fetchNewQuestions,
      isFetching: state.isFetching,
      setIsFetching: state.setIsFetching,
    })
  )

  const { activate } = UseGetQuestionBtnStore((state) => ({
    activate: state.activate,
  }))

  const getQuestion = async () => {
    setIsFetching(true)
    if (isFetching) return console.log('질문을 받아오는 중입니다.')

    try {
      await fetchNewQuestions()
      location.reload()
    } catch (error) {
      console.error('새 질문을 받아오는 데 실패했습니다.', error)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <GetQuestion onClick={getQuestion} activate={activate}>
      <GetSvg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 4V38M4 21H38"
          stroke={activate ? '#ffffff' : '#ffa800'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </GetSvg>
      <GetQuestionTxt activate={activate}>새 질문 받아오기</GetQuestionTxt>
    </GetQuestion>
  )
}

export default GetQuestionBtn
