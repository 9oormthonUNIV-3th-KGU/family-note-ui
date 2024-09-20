import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { UseFamilyStore } from '../stores/UseFamilyStore'
import { FetchFamilyList } from '../services/GetFamilyListApi'

const FamilyBoxWrap = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 13px;
  max-height: 511px;
  width: 385px;
  top: 84px;
  left: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`

const FamilyBoxBtn = styled.button`
  box-sizing: border-box;
  width: 186px;
  height: 118px;
  padding: 0;
  border: 1px solid #ffccb6;
  border-radius: 9px;
  background: transparent;
`

const FamilyHeader = styled.div`
  position: relative;
  width: auto;
  left: 26px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 9px;
`

const FamilyName = styled.p`
  max-width: 115px;
  width: auto;
  height: 21px;
  margin: 0;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #000000;
`

const FamilyMembers = styled.div`
  padding-left: 26px;
  max-height: 64px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 5px;
  font-family: 'Pretendard Variable';
  font-weight: 300;
  font-size: 12px;
  color: #000000;
`

const MemberNickname = styled.span`
  width: 53px;
  text-align: left;
`

const FamilyMemberCounts = styled.p`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  color: #8f8f8f;
  margin: 0;
`

function FamilyBox() {
  const { families, setFamilies } = UseFamilyStore()
  const familyNameRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const data = await FetchFamilyList()
        setFamilies(data.contents)
      } catch (error) {
        console.error('Failed to fetch family list', error)
      }
    }
    fetchFamilies()
  }, [setFamilies])

  return (
    <FamilyBoxWrap>
      {families.map((family, index) => (
        <FamilyBoxBtn key={family.familyId}>
          <FamilyHeader>
            <FamilyName ref={(el) => (familyNameRefs.current[index] = el)}>
              {family.familyName}
            </FamilyName>
            <FamilyMemberCounts>
              {family.familyMembers.length}
            </FamilyMemberCounts>
          </FamilyHeader>
          <FamilyMembers>
            {family.familyMembers.slice(0, 6).map((member) => (
              <MemberNickname key={member.familyMemberId}>
                {member.nickName}
              </MemberNickname>
            ))}
          </FamilyMembers>
        </FamilyBoxBtn>
      ))}
    </FamilyBoxWrap>
  )
}

export default FamilyBox
