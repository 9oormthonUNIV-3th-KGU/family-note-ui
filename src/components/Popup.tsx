import styled from '@emotion/styled'
import { forwardRef } from 'react'

interface Props {
  text: string
  onClick?: () => void
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

const Popup = forwardRef<HTMLDivElement, Props>(({ text, onClick }, ref) => {
  return (
    <PopupContainer>
      <PopupContent ref={ref}>
        <Title>{text}</Title>
        <ButtonContainer>
          <RoundedButton onClick={onClick || (() => {})}>아니요</RoundedButton>
          <RoundedButton onClick={onClick || (() => {})} isPrimary={true}>
            네
          </RoundedButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  )
})

export default Popup
