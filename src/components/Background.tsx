import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { ReactNode } from 'react'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Image = styled.img<{
  top?: string
  bottom?: string
  left?: string
  right?: string
}>`
  position: absolute;
  z-index: -10;
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};

  animation: ${rotate} 30s linear infinite;
`

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Background = ({ children }: { children: ReactNode }) => {
  return (
    <BackgroundWrapper>
      <Image
        src="../src/assets/images/left-top.svg"
        top={'-244px'}
        left={'-105px'}
      ></Image>
      <Image
        src="../src/assets/images/right-top.svg"
        top={'-67px'}
        right={'-226px'}
      ></Image>
      <Image
        src="../src/assets/images/left-bottom.svg"
        bottom={'-143.54px'}
        left={'-76.41px'}
      ></Image>
      <Image
        src="../src/assets/images/right-bottom.svg"
        bottom={'-207px'}
        right={'108px'}
      ></Image>
      {children}
    </BackgroundWrapper>
  )
}

export default Background
