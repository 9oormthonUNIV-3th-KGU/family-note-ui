import styled from '@emotion/styled'
import logo_horizontal from '../assets/logo_horizontal.png'
import LogoutBtn from './LogoutBtn'

const HeaderWrap = styled.div`
  width: 1440px;
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
