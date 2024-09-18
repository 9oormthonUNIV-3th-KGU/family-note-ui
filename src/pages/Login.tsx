import styled from '@emotion/styled'
import LoginForm from '../components/LoginForm'
import Background from '../components/Background'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const FormWrapper = styled.div`
  width: 417px;
`

const Login = () => {
  return (
    <Container>
      <Background></Background>
      <div>
        <img src="../src/assets/images/logo.svg"></img>
        <FormWrapper>
          <LoginForm></LoginForm>
        </FormWrapper>
      </div>
    </Container>
  )
}

export default Login
