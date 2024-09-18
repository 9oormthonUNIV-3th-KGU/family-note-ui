import * as yup from 'yup'

const profileValidationSchema = yup.object().shape({
  nickname: yup.string().required('이름을 입력하세요'),
  password: yup.string().required('비밀번호를 입력하세요'),
  confirmPassword: yup
    .string()
    .required('비밀번호를 다시 입력하세요')
    .oneOf([yup.ref('password')], '입력을 재확인 해주세요'),
})

export default profileValidationSchema
