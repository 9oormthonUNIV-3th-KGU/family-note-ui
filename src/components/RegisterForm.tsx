import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Profile } from '../model/Profile'
import { useRegister } from '../hooks/useRegister'
import TextButton from './TextButton'
import profileValidationSchema from '../validation/profileValidationSchema'

const Form = styled.form`
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
const InputForm = styled.input<{ placeholder?: string }>`
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

const RegisterForm = () => {
  const { error, isLoading, signup, toast } = useRegister()
  const formik = useFormik<Profile>({
    initialValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: (profile: Profile, { resetForm }) => {
      const { confirmPassword, ...profileData } = profile
      console.log(profileData)
      signup(profileData)
      resetForm()
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormLabel>닉네임</FormLabel>
      <InputForm
        type="nickname"
        id="nickname"
        placeholder="30자 이내로 작성해주시길 바랍니다."
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
      <FormLabel>비밀번호 재확인</FormLabel>
      <InputForm
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></InputForm>
      <TextButton
        text="회원가입"
        isPrimary={false}
        onClick={formik.handleSubmit}
      ></TextButton>
      <TextButton text="로그인" isPrimary={true}></TextButton>
    </Form>
  )
}

export default RegisterForm
