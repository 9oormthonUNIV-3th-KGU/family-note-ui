import * as yup from 'yup'

const profileValidationSchema = yup.object().shape({
  nickname: yup.string().required('이름을 입력하세요'),
  password: yup
    .string()
    .required('비밀번호를 입력하세요')
    .min(8, '비밀번호는 최소 8자리 이상이어야 합니다')
    .matches(/[a-zA-Z]/, '비밀번호에는 영문자가 포함되어야 합니다')
    .matches(/[0-9]/, '비밀번호에는 숫자가 포함되어야 합니다'),
  confirmPassword: yup
    .string()
    .required('비밀번호를 다시 입력하세요')
    .oneOf([yup.ref('password')], '입력을 재확인 해주세요'),
})

export default profileValidationSchema
