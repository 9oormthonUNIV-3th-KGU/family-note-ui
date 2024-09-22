import styled from '@emotion/styled'
import { FiSearch } from 'react-icons/fi'

interface Props {
  onClick: () => void
  onChange: (e: any) => void
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  width: 381px;
  height: 18px;
  border: 2px solid #ffa800;
  border-radius: 50px;
  background: #fff;
`

const Input = styled.input`
  font-family: Inter;
  font-style: normal;
  font-size: 20px;
  width: 100%;
  line-height: 30px;
  border: none;
  outline: none;
  background: none;
  caret-color: #ffa800;

  &::placeholder {
    color: #cdcdcd;
    font-family: Inter;
    font-style: light;
    font-size: 20px;
  }
`

const Icon = styled(FiSearch)`
  color: #cdcdcd;
  width: 30px;
  height: 30px;
`
const SearchBar = ({ onClick, onChange }: Props) => {
  return (
    <Container>
      <Input
        type="text"
        placeholder="가족 구성원의 닉네임을 검색해주세요."
        onClick={onClick}
        onChange={onChange}
      ></Input>
      <Icon></Icon>
    </Container>
  )
}

export default SearchBar
