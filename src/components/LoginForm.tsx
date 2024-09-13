import styled from '@emotion/styled'

interface Props {
  title: string
  marginBottom: string
}

const Form = styled.div<{ marginBottom: string }>`
  margin-bottom: ${(props) => props.marginBottom};
`

const FormLabel = styled.label`
  color: #000000;
  font-family: Inter;
  font-style: normal;
  font-size: 24px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`
const InputForm = styled.input`
  display: inline-block;
  background-color: #ededed;
  border: none;
  border-radius: 5px;
  font-family: Inter;
  font-style: normal;
  font-size: 20px;
  font-weight: 300;
  padding: 10px;
  height: 34px;
  width: 397px;

  &:focus {
    outline: none;
    caret-color: #ffa800;
  }
`

const LoginForm = ({ title, marginBottom }: Props) => {
  return (
    <Form marginBottom={marginBottom}>
      <FormLabel>{title}</FormLabel>
      <InputForm></InputForm>
    </Form>
  )
}

export default LoginForm
