import * as yup from 'yup'

const profileValidationSchema = yup.object().shape({
  familyName: yup.string().required('가족 구성원의 이름을 지어주세요'),
})

export default profileValidationSchema
