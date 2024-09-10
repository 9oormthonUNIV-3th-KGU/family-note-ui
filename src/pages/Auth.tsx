import styled from '@emotion/styled'
import React from 'react'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const FormLabel = styled.label`
  color: #000000;
  font-family: inter-medium;
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
`
const LoginForm = styled.input`
  background-color: #ededed;
  border: 2px solid #ededed;
  border-radius: 5px;
  font-family: inter-light
  font-size: 20px;
  padding: 10px 15px;
  margin-bottom: 30px;
  height: 24px;
  width: 400px;

  &:focus {
    outline: none;
    border: 2px solid #ffa800; 
  }
`

const Auth = () => {
  return (
    <Container>
      <div>
        <div>
          <form>
            <div>
              <FormLabel>닉네임</FormLabel>
              <LoginForm placeholder="30자 이내로 작성해주시길 바랍니다."></LoginForm>
            </div>
            <div>
              <FormLabel>비밀번호</FormLabel>
              <LoginForm></LoginForm>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Auth
