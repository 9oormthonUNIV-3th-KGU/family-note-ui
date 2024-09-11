import styled from '@emotion/styled'

const Box = styled.div`
  position: absolute;
  width: 591px;
  height: 462px;
  left: 629px;
  top: 212px;
  background: rgba(255, 206, 48, 0.57);
  border-radius: 26px;
  z-index: -1;
`

const AnswererBox = styled.div`
  position: absolute;
  width: 539px;
  height: 91px;
  left: 26px;
  top: 76px;
`

const Answerer = styled.p`
  position: absolute;
  width: 116px;
  height: 30px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  /* identical to box height, or 30px */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #000000;
`

const Answer = styled.p`
  position: absolute;
  width: 539px;
  height: 61px;
  top: 30px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 110%;
  /* or 22px */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #000000;
`

function AnswerBox() {
  return (
    <Box>
      <AnswererBox>
        {/* get answer api 받아서 map 적용하기 */}
        <Answerer>ID</Answerer>
        <Answer>내가 입력한 답변 ㅇㅇㅇㅇㅇㅇ</Answer>
      </AnswererBox>
    </Box>
  )
}

export default AnswerBox
