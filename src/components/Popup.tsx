import styled from '@emotion/styled'
import { forwardRef } from 'react'
import useFamilyCreate from '../hooks/useFamilyCreate'
import { useFormik } from 'formik'
import useProfileState from '../stores/userProfileStore'
import familyNameValidationSchema from '../validation/familyNameValidationSchema'

interface Props {
  text: string
  onClickNo: () => void
}

const PopupForm = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 37px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: popup-slide-in 0.3s ease-out;

  @keyframes popup-slide-in {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const Title = styled.p`
  font-family: Pretendard Variable;
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  white-space: pre-line;
  line-height: 150%;
  letter-spacing: -1.1%;
  margin-left: 20px;
  margin-bottom: 24px;
`

const RoundedButton = styled.button<{
  onClick?: () => void
  isPrimary?: boolean
}>`
  display: inline-block;
  background-color: ${(props) => (props.isPrimary ? '#ffa800' : '#ffffff')};
  color: ${(props) => (props.isPrimary ? '#ffffff' : '#ffa800')};
  font-family: Pretendard Variable;
  font-size: 30px;
  font-weight: 600;
  border: 4px solid #ffa800;
  border-radius: 24px;
  cursor: pointer;
  width: 226px;
  height: 82px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 24px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 24px;
`

const Input = styled.input<{ hasError: boolean }>`
  font-family: Inter;
  font-style: normal;
  font-size: 24px;
  width: 441px;
  padding: 10px 15px;
  line-height: 30px;
  border: ${({ hasError }) =>
    hasError ? '1px solid #ff0000' : '1px solid #ededed'};
  border-radius: 5px;
  outline: none;
  background: #ededed;
  caret-color: #ffa800;

  &::placeholder {
    color: #cdcdcd;
    font-family: Inter;
    font-style: light;
    font-size: 20px;
  }
`

const Popup = forwardRef<HTMLDivElement, Props>(({ text, onClickNo }, ref) => {
  const { createFamily } = useFamilyCreate()

  const selectedProfiles = useProfileState((state) => state.contents)

  const userIds = selectedProfiles.map((profile) => profile.id)

  const formik = useFormik<{ familyName: string }>({
    initialValues: {
      familyName: '',
    },
    validationSchema: familyNameValidationSchema,
    onSubmit: (value) => {
      createFamily({ userIds: userIds, familyName: value.familyName })
      console.log(`family created : ${value.familyName}, ${userIds}`)
    },
  })

  return (
    <PopupForm onSubmit={formik.handleSubmit}>
      <PopupContent ref={ref}>
        <Title>{text}</Title>
        <Input
          type="familyName"
          id="familyName"
          name="familyName"
          placeholder="가족 구성원의 이름을 지어주세요"
          value={formik.values.familyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          hasError={!!(formik.touched.familyName && formik.errors.familyName)}
        ></Input>
        <ButtonContainer>
          <RoundedButton onClick={onClickNo}>아니요</RoundedButton>
          <RoundedButton type="submit" isPrimary={true}>
            네
          </RoundedButton>
        </ButtonContainer>
      </PopupContent>
    </PopupForm>
  )
})

export default Popup
