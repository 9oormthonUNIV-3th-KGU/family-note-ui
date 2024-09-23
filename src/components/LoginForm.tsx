import styled from '@emotion/styled'
import TextButton from './TextButton'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { AuthRequest } from '../model/AuthRequest'
import { useLogin } from '../hooks/useLogin'
import useCurrentUserStore from '../stores/useCurrentUserStore'

const Form = styled.form`
  margin-bottom: 31px;
  position: relative;
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
const Error = styled.div`
  font-family: Inter;
  font-style: normal;
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.011em;
  color: #ff0000;
  position: absolute;
  min-height: 24px;
  text-align: center;
  width: 100%;
  bottom: -50px;
`
const LoginForm = () => {
  const navigate = useNavigate()

  const { login, error } = useLogin()
  const { setNickname } = useCurrentUserStore()

  const formik = useFormik<AuthRequest>({
    initialValues: {
      nickname: '',
      password: '',
    },
    onSubmit: (authRequest: AuthRequest) => {
      console.log('auth request', authRequest)
      login(authRequest)
      setNickname(authRequest.nickname)
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormLabel>닉네임</FormLabel>
      <InputForm
        type="nickname"
        id="nickname"
        name="nickname"
        value={formik.values.nickname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></InputForm>
      <FormLabel>비밀번호</FormLabel>
      <InputForm
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></InputForm>
      <TextButton
        text="로그인"
        isPrimary={true}
        onClick={formik.handleSubmit}
      ></TextButton>
      <TextButton
        text="회원가입"
        isPrimary={false}
        onClick={() => navigate('/register')}
      ></TextButton>{' '}
      {error && (
        <Error>
          로그인에 실패했습니다.
          <br />
          아이디와 비밀번호를 다시 한 번 확인해 주세요.
        </Error>
      )}
    </Form>
  )
}

export default LoginForm
