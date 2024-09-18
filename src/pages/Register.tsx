import styled from '@emotion/styled'
import Background from '../components/Background'
import RegisterForm from '../components/RegisterForm'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const FormWrapper = styled.div`
  width: 417px;
`

const Register = () => {
  return (
    <Container>
      <Background></Background>
      <div>
        <img src="../src/assets/images/logo.svg"></img>
        <FormWrapper>
          <RegisterForm></RegisterForm>
        </FormWrapper>
      </div>
    </Container>
  )
}

export default Register
