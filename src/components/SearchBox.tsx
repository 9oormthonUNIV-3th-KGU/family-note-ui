import styled from '@emotion/styled'
import SearchBar from './SearchBar'

const Box = styled.div`
  position: relative;
  width: 479px;
  height: 494px;
  border-left: 2px solid #cdcdcd;
  border-right: 2px solid #cdcdcd;
  border-bottom: 2px solid #cdcdcd;
  border-radius: 46px;
`

const SearchBox = () => {
  return (
    <Box>
      <SearchBar></SearchBar>
    </Box>
  )
}

export default SearchBox
