import styled from '@emotion/styled'
import Background from '../components/Background'
import Header from '../components/Header'
import FamilySheet from '../components/FamilySheet'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh - 150px;
`

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Search = () => {
  return (
    <div>
      <Header />
      <Main>
        <Background>
          <StyledDiv>
            <FamilySheet></FamilySheet>
          </StyledDiv>
        </Background>
      </Main>
    </div>
  )
}

export default Search
