import styled from '@emotion/styled'
import { ChangeEvent, forwardRef } from 'react'

interface Props {
  text: string
  onChange: (familyName: string) => void
  onClickYes: () => void
  onClickNo: () => void
}

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

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 37px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: popup-slide-in 0.3s ease-out;

  @keyframes popup-slide-in {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const Title = styled.p`
  font-family: Pretendard Variable;
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  white-space: pre-line;
  line-height: 150%;
  letter-spacing: -1.1%;
  margin-left: 20px;
  margin-bottom: 24px;
`

const RoundedButton = styled.button<{
  onClick: () => void
  isPrimary?: boolean
}>`
  display: inline-block;
  background-color: ${(props) => (props.isPrimary ? '#ffa800' : '#ffffff')};
  color: ${(props) => (props.isPrimary ? '#ffffff' : '#ffa800')};
  font-family: Pretendard Variable;
  font-size: 30px;
  font-weight: 600;
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
  margin-top: 24px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 24px;
`

const Input = styled.input`
  font-family: Inter;
  font-style: normal;
  font-size: 24px;
  width: 441px;
  padding: 10px 15px;
  line-height: 30px;
  border: none;
  border-radius: 5px;
  outline: none;
  background: #ededed;
  caret-color: #ffa800;

  &::placeholder {
    color: #cdcdcd;
    font-family: Inter;
    font-style: light;
    font-size: 20px;
  }
`

const Popup = forwardRef<HTMLDivElement, Props>(
  ({ text, onChange, onClickNo, onClickYes }, ref) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    }
    return (
      <PopupContainer>
        <PopupContent ref={ref}>
          <Title>{text}</Title>
          <Input
            placeholder="가족 구성원의 이름을 지어주세요"
            onChange={handleInputChange}
          ></Input>
          <ButtonContainer>
            <RoundedButton onClick={onClickNo}>아니요</RoundedButton>
            <RoundedButton onClick={onClickYes} isPrimary={true}>
              네
            </RoundedButton>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    )
  }
)

export default Popup
