import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import UseGetQuestionBtnStore from '../stores/UseGetQuestionBtnStore'
import useQuestionStore from '../stores/UseQuestionStore'

const LogoutButton = styled.button`
  position: absolute;
  width: auto;
  height: 39px;
  left: 87.3%;
  top: 50px;
  padding: 0;
  border: 0;
  background-color: transparent;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 150%;
  display: flex;
  align-items: center;

  color: #000000;
`

function LogoutBtn() {
  const navigate = useNavigate()
  const { setActivate } = UseGetQuestionBtnStore((state) => ({
    setActivate: state.setActivate,
  }))

  const { resetQuestionState } = useQuestionStore((state) => ({
    resetQuestionState: state.resetQuestionState,
  }))

  const logout = () => {
    location.reload()
    setActivate()
    resetQuestionState()
    localStorage.removeItem('familyId')
    navigate('/login')
    console.log('logout')
  }

  return <LogoutButton onClick={logout}>로그아웃</LogoutButton>
}

export default LogoutBtn
