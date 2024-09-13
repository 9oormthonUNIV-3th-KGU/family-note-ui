import styled from '@emotion/styled'
import Background from '../components/Background'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Search = () => {
  return (
    <div>
      <Header></Header>
      <Container>
        <Background></Background>
        <SearchBar></SearchBar>
      </Container>
    </div>
  )
}

export default Search
