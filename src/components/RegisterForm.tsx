import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Profile } from '../model/Profile'
import { useRegister } from '../hooks/useRegister'
import TextButton from './TextButton'
import profileValidationSchema from '../validation/profileValidationSchema'
import { useNavigate } from 'react-router-dom'
import { FaXmark } from 'react-icons/fa6'

const Form = styled.form`
  margin-bottom: 31px;
`

const FormLabel = styled.label<{ marginTop?: string }>`
  color: #000000;
  font-family: Inter;
  font-style: normal;
  font-size: 24px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const InputForm = styled.input<{ placeholder?: string; hasError: boolean }>`
  display: inline-block;
  background-color: #ededed;
  border: ${({ hasError }) =>
    hasError ? '1px solid #ff0000' : '1px solid #ededed'};
  border-radius: 5px;
  font-family: Inter;
  font-style: normal;
  font-size: 20px;
  font-weight: 300;
  padding: 10px;
  height: 34px;
  width: 397px;
  margin-bottom: 40px;

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
  margin-top: -36px;
  margin-bottom: 35px;
`

const ErrorIcon = styled(FaXmark)`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 15px;
  top: 15px;
  color: #ff0000;
`

const RegisterForm = () => {
  const navigate = useNavigate()
  const { signup } = useRegister()
  const formik = useFormik<Profile>({
    initialValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: (profile: Profile, { resetForm, setErrors }) => {
      const { confirmPassword, ...profileData } = profile
      console.log(profileData)
      signup(profileData, setErrors, resetForm)
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormLabel>닉네임</FormLabel>
      <InputWrapper>
        <InputForm
          type="nickname"
          id="nickname"
          placeholder="30자 이내로 작성해주시길 바랍니다."
          name="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          hasError={!!(formik.touched.nickname && formik.errors.nickname)}
        />{' '}
        {formik.touched.nickname && formik.errors.nickname && <ErrorIcon />}
      </InputWrapper>
      {formik.touched.nickname && formik.errors.nickname ? (
        <Error>{formik.errors.nickname}</Error>
      ) : null}
      <FormLabel>비밀번호</FormLabel>
      <InputWrapper>
        <InputForm
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          hasError={!!(formik.touched.password && formik.errors.password)}
        />{' '}
        {formik.touched.password && formik.errors.password && <ErrorIcon />}
      </InputWrapper>
      {formik.touched.password && formik.errors.password ? (
        <Error>{formik.errors.password}</Error>
      ) : null}
      <FormLabel>비밀번호 재확인</FormLabel>
      <InputWrapper>
        <InputForm
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          hasError={
            !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
        />{' '}
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <ErrorIcon />
        )}
      </InputWrapper>
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <Error>{formik.errors.confirmPassword}</Error>
      ) : null}
      <TextButton
        text="회원가입"
        isPrimary={true}
        onClick={formik.handleSubmit}
      ></TextButton>
      <TextButton
        text="로그인"
        isPrimary={false}
        onClick={() => navigate('/login')}
      ></TextButton>
    </Form>
  )
}

export default RegisterForm
