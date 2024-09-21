import styled from '@emotion/styled'
import Header from '../components/common/Header'
import Background from '../components/Background'
import FamilyListBox from '../components/select/FamilyListBox'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh - 150px;
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
  return (
    <>
      <Header></Header>
      <Main>
        <Background />
        <TitleText>어느 채팅방으로 들어가실 건가요?</TitleText>
        <FamilyListBox />
      </Main>
    </>
  )
}
export default Select
