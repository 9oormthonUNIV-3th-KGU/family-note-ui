import styled from '@emotion/styled'
import SearchBar from './SearchBar'
import TextButton from './TextButton'
import { TiPlus, TiMinus } from 'react-icons/ti'
import Popup from './Popup'
import usePopupStore from '../stores/usePopupStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 417px;
  height: 493px;
`

const Sheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 417px;
  height: 493px;
  overflow-y: scroll;
  border: 2px solid #cdcdcd;
  border-radius: 16px;
  background: #fff;
  margin-top: 16px;
  margin-bottom: 27px;
  z-index: 1;
  position: absolute;
  top: 40px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 479px;
  height: 494px;
  overflow-y: scroll;
  border-left: 2px solid #cdcdcd;
  border-right: 2px solid #cdcdcd;
  border-bottom: 2px solid #cdcdcd;
  border-radius: 46px;
  background: #fff;
  margin-top: 16px;
  margin-bottom: 27px;
  position: absolute;
  top: 0;
  z-index: 2;

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

const Icon = styled(TiMinus)`
  margin: 0;
  padding: 0;
  color: #7f7f7f;
  width: 40px;
  height: 40px;
  border: 2px solid #808080;
  border-radius: 50%;
`

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  z-index: 3;
`

const TextButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -150px;
  left: 0;
  right: 0;
  z-index: 3;
`

const items = Array.from({ length: 30 }, (_, i) => `Name ${i + 1}`)

const FaimlySheet = () => {
  const isPopupOpen = usePopupStore((state) => state.isOpen)
  const openPopup = usePopupStore((state) => state.openPopup)
  const closePopup = usePopupStore((state) => state.closePopup)

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar></SearchBar>
      </SearchBarWrapper>
      <Box></Box>
      <Sheet>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Text>{item}</Text>
            <Icon></Icon>
          </ListItem>
        ))}
      </Sheet>
      <TextButtonWrapper>
        <TextButton
          text="가족 구성원 모집 완료"
          isPrimary={true}
          onClick={openPopup}
        ></TextButton>
      </TextButtonWrapper>
      {isPopupOpen && (
        <Popup
          text={'가족 구성원 모집을\n 완료 하시겠습니까?'}
          onClick={closePopup}
        ></Popup>
      )}
    </Container>
  )
}

export default FaimlySheet
