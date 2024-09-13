import styled from '@emotion/styled'

const Image = styled.img<{
  top?: string
  bottom?: string
  left?: string
  right?: string
}>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
`

const Background = () => {
  return (
    <div>
      <Image
        src="../src/assets/images/left-top.svg"
        top={'0'}
        left={'0'}
      ></Image>
      <Image
        src="../src/assets/images/right-top.svg"
        top={'0'}
        right={'0'}
      ></Image>
      <Image
        src="../src/assets/images/left-bottom.svg"
        bottom={'0'}
        left={'0'}
      ></Image>
      <Image
        src="../src/assets/images/right-bottom.svg"
        bottom={'0'}
        right={'108px'}
      ></Image>
    </div>
  )
}

export default Background
