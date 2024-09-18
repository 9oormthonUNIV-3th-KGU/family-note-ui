import styled from '@emotion/styled'
import Background from '../components/Background'
import TextButton from '../components/TextButton'
import { useRegister } from '../hooks/useRegister'
import { Profile } from '../model/Profile'
import { useFormik } from 'formik'
import RegisterForm from '../components/RegisterForm'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const FormWrapper = styled.form`
  width: 417px;
`

const Register = () => {
  const { error, isLoading, signup, toast } = useRegister()
  const formik = useFormik<Profile>({
    initialValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (profile: Profile, { resetForm }) => {
      signup(profile)
      resetForm()
    },
  })

  return (
    <Container>
      <Background></Background>
      <div>
        <img src="../src/assets/images/logo.svg"></img>
        <FormWrapper>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {toast && <p>{toast}</p>}
          <RegisterForm></RegisterForm>
          <TextButton text="로그인" isPrimary={true}></TextButton>
          <TextButton text="회원가입" isPrimary={false}></TextButton>
        </FormWrapper>
      </div>
    </Container>
  )
}

export default Register
