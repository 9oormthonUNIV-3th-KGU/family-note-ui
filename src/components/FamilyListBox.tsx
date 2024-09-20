import styled from '@emotion/styled'
import GotoSearchBtn from './GotoSearchBtn'

const FamilyListBoxWrap = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 417px;
  height: 645px;
  left: calc(50% - 417px / 2 + 0.5px);
  top: 256px;

  border: 2px solid #cdcdcd;
  border-radius: 16px;
`

const FamilyListBox = () => {
  return (
    <FamilyListBoxWrap>
      <GotoSearchBtn />
    </FamilyListBoxWrap>
  )
}

export default FamilyListBox
