import styled from '@emotion/styled'
import SearchBar from './SearchBar'
import TextButton from './TextButton'
import { TiPlus } from 'react-icons/ti'
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 417px;
  height: 493px;
  overflow-y: scroll;
  border: 2px solid #cdcdcd;
  border-radius: 16px;
  margin-top: 16px;
  margin-bottom: 27px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`
const ListItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 381px;
  height: 62px;
  border-bottom: 1px solid #5b5b5b;
  margin-top: 22px;
  padding-left: 18px;
  padding-right: 18px;
  box-sizing: border-box;
  flex-shrink: 0;
`

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: Inter;
  font-style: normal;
  font-size: 24px;
  font-weight: 500;
`

const Icon = styled(TiPlus)`
  margin: 0;
  padding: 0;
  color: #7f7f7f;
  width: 40px;
  height: 40px;
  border: 2px solid #808080;
  border-radius: 50%;
`

const items = Array.from({ length: 30 }, (_, i) => `Name ${i + 1}`)

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`

const Popup = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`

const Title = styled.p`
  font-family: Pretendard;
  font-style: semibold;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  white-space: pre-line;
  line-height: 150%;
  letter-spacing: -1.1%;
`

const RoundedButton = styled.button<{
  onClick: () => void
  isPrimary?: boolean
}>`
  display: inline-block;
  background-color: ${(props) => (props.isPrimary ? '#ffa800' : '#ffffff')};
  color: ${(props) => (props.isPrimary ? '#ffffff' : '#ffa800')};
  font-family: Pretendard;
  font-style: semibold;
  font-size: 30px;
  font-weight: 700;
  border: 4px solid #ffa800;
  border-radius: 24px;
  cursor: pointer;
  width: 226px;
  height: 82px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 60px;
  margin-left: 21px;
  margin-right: 21px;
  margin-bottom: 26px;
`

const SearchBox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <Container>
      <SearchBar></SearchBar>
      <Box>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Text>{item}</Text>
            <Icon></Icon>
          </ListItem>
        ))}
      </Box>
      <TextButton
        text="가족 구성원 모집 완료"
        isPrimary={true}
        onClick={openPopup}
      ></TextButton>
      {isPopupOpen && (
        <PopupContainer>
          <Popup>
            <Title>가족 구성원 모집을{'\n'} 완료 하시겠습니까?</Title>
            <ButtonContainer>
              <RoundedButton onClick={closePopup}>아니요</RoundedButton>
              <RoundedButton onClick={closePopup} isPrimary={true}>
                네
              </RoundedButton>
            </ButtonContainer>
          </Popup>
        </PopupContainer>
      )}
    </Container>
  )
}

export default SearchBox
