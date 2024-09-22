import styled from '@emotion/styled'

interface Props {
  text: string
  isPrimary: boolean
  position?: string
  left?: string
  top?: string
  margin?: string
  onClick?: () => void
}

const Button = styled.button<{
  isPrimary?: boolean
  position?: string
  left?: string
  top?: string
  margin?: string
}>`
  display: inline-block;
  background-color: ${(props) => (props.isPrimary ? '#ffa800' : '#ffffff')};
  color: ${(props) => (props.isPrimary ? '#ffffff' : '#000000')};
  font-family: Inter;
  font-style: normal;
  font-size: ${(props) => (props.isPrimary ? '30px' : '26px')};
  font-weight: ${(props) => (props.isPrimary ? '700' : '500')};
  border: none;
  border-radius: 9px;
  padding: 5px;
  margin-bottom: ${(props) => (props.margin ? props.margin : '20px')};
  cursor: pointer;
  width: 417px;
  height: 54px;

  position: ${(props) => (props.position ? props.position : '')};
  left: ${(props) => (props.left ? props.left : '')};
  top: ${(props) => (props.top ? props.top : '')};
`

const TextButton = ({
  text,
  isPrimary,
  position,
  left,
  top,
  margin,
  onClick,
}: Props) => {
  return (
    <Button
      isPrimary={isPrimary}
      position={position}
      left={left}
      top={top}
      margin={margin}
      onClick={onClick}
      type="submit"
    >
      {text}
    </Button>
  )
}

export default TextButton
