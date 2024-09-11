import styled from '@emotion/styled'

const GetQuestion = styled.button`
  position: absolute;
  width: 388px;
  height: 116px;
  left: 208px;
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
  /* get base question api 연동 */
  const getQuestion = () => {
    console.log('GetQuestionBtn clicked')
  }

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
