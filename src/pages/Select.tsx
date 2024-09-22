import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from '../components/Header'
import Background from '../components/Background'
import FamilyListBox from '../components/FamilyListBox'
import TextButton from '../components/TextButton'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const TitleText = styled.p`
  position: absolute;
  width: 425px;
  height: 45px;
  left: calc(50% - 425px / 2 - 0.5px);
  top: 192px;
  margin: 0;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 150%;
  /* identical to box height, or 45px */
  display: flex;
  align-items: center;

  color: #000000;
`

function Select() {
  const navigate = useNavigate()

  const gotoSearch = () => {
    navigate('/search')
  }
  return (
    <>
      <Header />
      <Main>
        <Background>
          <TitleText>어느 채팅방으로 들어가실 건가요?</TitleText>
          <FamilyListBox />
          <TextButton
            text="새 가족 구성원 모집하기"
            isPrimary={true}
            onClick={gotoSearch}
            position={'absolute'}
            left={'calc(50% - 417px / 2 + 0.5px)'}
            top={'776px'}
            margin={'0'}
          />
        </Background>
      </Main>
    </>
  )
}
export default Select
