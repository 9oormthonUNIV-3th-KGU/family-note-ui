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

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Login = () => {
  return (
    <Container>
      <Background>
        <StyledDiv>
          <img src="../src/assets/images/logo.svg"></img>
          <FormWrapper>
            <LoginForm></LoginForm>
          </FormWrapper>
        </StyledDiv>
      </Background>
    </Container>
  )
}

export default Login
