import styled from '@emotion/styled'
import LoginForm from '../components/LoginForm'
import Background from '../components/Background'
import TextButton from '../components/TextButton'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const FormWrapper = styled.form`
  width: 417px;
`

const Login = () => {
  return (
    <Container>
      <Background></Background>
      <div>
        <img src="../src/assets/images/logo.svg"></img>
        <FormWrapper>
          <LoginForm title="닉네임" marginBottom="35Px"></LoginForm>
          <LoginForm title="비밀번호" marginBottom="66Px"></LoginForm>
          <TextButton text="로그인" isPrimary={true}></TextButton>
          <TextButton text="회원가입" isPrimary={false}></TextButton>
        </FormWrapper>
      </div>
    </Container>
  )
}

export default Login
