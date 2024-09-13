import styled from '@emotion/styled'

interface Props {
  text: string
  isPrimary: boolean
}

const Button = styled.button<{ isPrimary?: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.isPrimary ? '#ffa800' : '#ffffff')};
  color: ${(props) => (props.isPrimary ? '#ffffff' : '#000000')};
  font-family: Inter;
  font-style: normal;
  font-size: ${(props) => (props.isPrimary ? '30px' : '26px')};
  font-weight: ${(props) => (props.isPrimary ? '700' : '500')};
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 417px;
`

const TextButton = ({ text, isPrimary }: Props) => {
  return <Button isPrimary={isPrimary}>{text}</Button>
}

export default TextButton
