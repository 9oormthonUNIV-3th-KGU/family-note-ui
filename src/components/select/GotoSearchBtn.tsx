import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

const GotoSearchButton = styled.button`
  position: absolute;
  width: 385px;
  height: 54px;
  left: 16px;
  top: 14px;

  background: #ffa800;
  border-radius: 9px;
  border: 0;
`

const GotoSearchBtnTxt = styled.p`
  position: absolute;
  width: 253px;
  height: 39px;
  left: calc(50% - 253px / 2);
  top: 8px;
  margin: 0;

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 150%;
  /* identical to box height, or 39px */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.011em;

  color: #ffffff;
`

const GotoSearchBtn = () => {
  const navigate = useNavigate()

  const gotoSearch = () => {
    navigate('/search')
  }

  return (
    <GotoSearchButton onClick={gotoSearch}>
      <GotoSearchBtnTxt>새 가족 구성원 모집하기 !</GotoSearchBtnTxt>
    </GotoSearchButton>
  )
}

export default GotoSearchBtn
