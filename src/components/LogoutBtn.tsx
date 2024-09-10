import styled from '@emotion/styled'

const LogoutButton = styled.button`
  position: absolute;
  width: auto;
  height: 39px;
  left: 1258px;
  top: 61px;
  padding: 0;
  border: 0;
  background-color: transparent;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 26px;
  line-height: 150%;
  display: flex;
  align-items: center;

  color: #000000;
`

function LogoutBtn() {
  // 백엔드 연결 후 수정
  const logout = () => {
    console.log('logout')
  }

  return <LogoutButton onClick={logout}>로그아웃</LogoutButton>
}

export default LogoutBtn
