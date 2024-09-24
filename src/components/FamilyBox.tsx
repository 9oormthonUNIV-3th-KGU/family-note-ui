import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { UseFamilyStore } from '../stores/UseFamilyStore'
import { FetchFamilyList } from '../services/GetFamilyListApi'
import { FetchFamilyData } from '../services/GetFamilyApi'
import useQuestionStore from '../stores/UseQuestionStore'
import { UseCursorStore } from '../stores/UseCursorStore'
import SvgIcon from './SelectSvg'

const FamilyBoxWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 13px;
  max-height: 462px;
  width: 385px;
  top: 15px;
  left: 16px;

  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const Row = styled.div<{ hoveredFamilyId: number | null; startIndex: number }>`
  display: grid;
  grid-template-columns: ${({ hoveredFamilyId, startIndex }) => {
    const isHoveredInRow =
      hoveredFamilyId !== null &&
      Math.floor(hoveredFamilyId / 2) === Math.floor(startIndex / 2)
    if (isHoveredInRow && hoveredFamilyId % 2 === 0) return '216px 158px'
    if (isHoveredInRow && hoveredFamilyId % 2 === 1) return '158px 216px'
    return '1fr 1fr'
  }};
  transition: width 0.5s cubic-bezier(0.5, 1, 0.4, 1),
    gap 0.5s cubic-bezier(0.5, 1, 0.4, 1);
  gap: ${({ hoveredFamilyId }) => (hoveredFamilyId !== null ? '11px' : '13px')};
`

const FamilyBoxBtn = styled.button<{ isHovered: boolean; isLoading: boolean }>`
  box-sizing: border-box;
  height: 118px;
  padding: 0;
  border: 1px solid #ffccb6;
  border-radius: 9px;
  background: transparent;
  position: relative;
  flex-grow: ${({ isHovered }) => (isHovered ? 2 : 1)};
  cursor: ${({ isLoading }) => (isLoading ? 'wait' : '')};
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
  max-width: 53px;
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

interface Family {
  familyId: number
  familyName: string
  familyMembers: {
    familyMemberId: number
    nickName: string
  }[]
}

function FamilyBox() {
  const { families, setFamilies, hoveredFamilyId, setHoveredFamilyId } =
    UseFamilyStore()
  const familyNameRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const navigate = useNavigate()
  const { fetchQuestions } = useQuestionStore()
  const { isLoading, setIsLoading } = UseCursorStore()

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

  const rows = families.reduce((acc, family, index) => {
    if (index % 2 === 0) {
      acc.push([family])
    } else {
      acc[acc.length - 1].push(family)
    }
    return acc
  }, [] as Family[][])

  const handleFamilyClick = async (familyId: number) => {
    localStorage.setItem('familyId', String(familyId))

    if (familyId) {
      try {
        setIsLoading(true)
        await FetchFamilyData(familyId)
        await fetchQuestions(familyId, 0, 45)
        navigate('/home')
      } catch (error) {
        console.error('Error fetching family data before navigate:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <FamilyBoxWrap>
      {rows.map((rowFamilies, rowIndex) => (
        <Row
          key={`row-${rowIndex}-${rowFamilies[0].familyId}`}
          hoveredFamilyId={hoveredFamilyId}
          startIndex={rowIndex * 2}
        >
          {rowFamilies.map((family, index) => {
            const actualIndex = rowIndex * 2 + index
            const isHovered = hoveredFamilyId === actualIndex

            return (
              <FamilyBoxBtn
                key={family.familyId}
                onMouseEnter={() => setHoveredFamilyId(actualIndex)}
                onMouseLeave={() => setHoveredFamilyId(null)}
                isHovered={isHovered}
                onClick={() => handleFamilyClick(family.familyId)}
                isLoading={isLoading}
              >
                <FamilyHeader>
                  <FamilyName
                    ref={(el) => (familyNameRefs.current[index] = el)}
                  >
                    {family.familyName}
                  </FamilyName>
                  <FamilyMemberCounts>
                    {family.familyMembers.length}
                  </FamilyMemberCounts>
                </FamilyHeader>
                <SvgIcon isHovered={isHovered} />
                <FamilyMembers>
                  {family.familyMembers
                    .slice(0, 6)
                    .map((member, memberIndex) => (
                      <MemberNickname
                        key={`${family.familyId}-${member.familyMemberId}-${memberIndex}`}
                      >
                        {member.nickName}
                      </MemberNickname>
                    ))}
                </FamilyMembers>
              </FamilyBoxBtn>
            )
          })}
        </Row>
      ))}
    </FamilyBoxWrap>
  )
}

export default FamilyBox
