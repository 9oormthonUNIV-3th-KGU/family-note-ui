import styled from '@emotion/styled'

const Box = styled.div`
  position: absolute;
  width: 388px;
  height: 524px;
  left: 208px;
  top: 150px;

  background: #ff5372;
  border-radius: 58px 194px 20px 20px;
`

const FamilyBoxEye = styled.div<{ left?: string }>`
  position: absolute;
  width: 18px;
  height: 27px;
  left: ${({ left }) => left || '266px'};
  top: 390px;

  background: #000000;
  border-radius: 12px;
`

const FamilyBoxLip = styled.svg`
  position: absolute;
  width: 54px;
  height: 21px;
  left: 278px;
  top: 451px;
  fill: none;
`

const FamilyBoxTitle = styled.p`
  position: absolute;
  width: 156px;
  height: 42px;
  left: 42px;
  top: 74px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  /* identical to box height, or 42px */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #ffffff;
`

const FamilyList = styled.p`
  position: absolute;
  width: 93px;
  height: 30px;
  left: 42px;
  top: 151px;
  marign: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  /* identical to box height, or 30px */
  display: flex;
  align-items: center;
  letter-spacing: -0.011em;

  color: #ffffff;
`

function FamilyBox() {
  return (
    <Box>
      {/*get 사용자 api*/}
      <FamilyBoxTitle>닉네임의 가족</FamilyBoxTitle>
      {/*get 가족 api*/}
      <FamilyList>mom1234</FamilyList>
      <FamilyBoxEye />
      <FamilyBoxEye left="325px" />
      <FamilyBoxLip viewBox="0 0 54 21" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M49 5C40.9389 13.3009 20.8534 24.9221 5 5"
          stroke="black"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </FamilyBoxLip>
    </Box>
  )
}

export default FamilyBox
