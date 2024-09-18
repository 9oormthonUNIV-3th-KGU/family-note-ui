import styled from '@emotion/styled'
import TextButton from './TextButton'
import { useNavigate } from 'react-router-dom'

const Form = styled.div`
  margin-bottom: 31px;
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
  margin-bottom: 35px;

  &:focus {
    outline: none;
    caret-color: #ffa800;
  }
`

const LoginForm = () => {
  const navigate = useNavigate()
  return (
    <Form>
      <FormLabel>닉네임</FormLabel>
      <InputForm></InputForm>
      <FormLabel>비밀번호</FormLabel>
      <InputForm></InputForm>
      <TextButton text="로그인" isPrimary={true}></TextButton>
      <TextButton
        text="회원가입"
        isPrimary={false}
        onClick={() => navigate('/register')}
      ></TextButton>
    </Form>
  )
}

export default LoginForm
