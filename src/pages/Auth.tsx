import styled from '@emotion/styled'
import React, { useState } from 'react'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const FormWrapper = styled.form`
  width: 417px;
`
const Form = styled.div<{ marginBottom: string }>`
  margin-bottom: ${(props) => props.marginBottom};
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
const LoginForm = styled.input`
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

  &:focus {
    outline: none;
    caret-color: #ffa800;
  }
`

const Button = styled.button<{ isPrimary: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.isPrimary ? '#ffa800' : '#ffffff')};
  color: ${(props) => (props.isPrimary ? '#ffffff' : '#000000')};
  font-family: Inter;
  font-style: normal;
  font-size: ${(props) => (props.isPrimary ? '30px' : '26px')};
  font-weight: ${(props) => (props.isPrimary ? '700' : '500')};
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  width: 417px;
`

const Image = styled.img<{
  top?: string
  bottom?: string
  left?: string
  right?: string
}>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
`

const Auth = () => {
  const [isPrimary, setIsPrimary] = useState(true)

  return (
    <Container>
      <div>
        <Image
          src="../src/assets/images/left-top.svg"
          top={'0'}
          left={'0'}
        ></Image>
        <Image
          src="../src/assets/images/right-top.svg"
          top={'0'}
          right={'0'}
        ></Image>
        <Image
          src="../src/assets/images/left-bottom.svg"
          bottom={'0'}
          left={'0'}
        ></Image>
        <Image
          src="../src/assets/images/right-bottom.svg"
          bottom={'0'}
          right={'108px'}
        ></Image>
        <div>
          <img src="../src/assets/images/logo.svg"></img>
          <FormWrapper>
            <Form marginBottom="35px">
              <FormLabel>닉네임</FormLabel>
              <LoginForm placeholder="30자 이내로 작성해주시길 바랍니다."></LoginForm>
            </Form>
            <Form marginBottom="66px">
              <FormLabel>비밀번호</FormLabel>
              <LoginForm></LoginForm>
            </Form>
            <Button isPrimary={isPrimary}>로그인</Button>
            <Button isPrimary={!isPrimary}>회원가입</Button>
          </FormWrapper>
        </div>
      </div>
    </Container>
  )
}

export default Auth
