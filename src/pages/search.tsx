import styled from '@emotion/styled'
import Background from '../components/Background'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh - 150px;
`

const Search = () => {
  return (
    <div>
      <Header></Header>
      <Main>
        <Background></Background>
        <SearchBar></SearchBar>
      </Main>
    </div>
  )
}

export default Search
