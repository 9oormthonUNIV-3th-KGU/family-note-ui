import styled from '@emotion/styled'
import logo_horizontal from '../assets/images/logo_horizontal.png'
import LogoutBtn from './LogoutBtn'

const HeaderWrap = styled.header`
  position: relative;
  top: 0;
  width: 100%;
  height: 150px;
  display: flex;
`

const LogoImg = styled.img`
  width: 470px;
  height: 126px;
`

function Header() {
  return (
    <>
      <HeaderWrap>
        <LogoImg src={logo_horizontal}></LogoImg>
        <LogoutBtn />
      </HeaderWrap>
    </>
  )
}

export default Header
