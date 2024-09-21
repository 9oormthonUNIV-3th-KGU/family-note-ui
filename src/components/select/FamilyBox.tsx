import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { UseFamilyStore } from '../../stores/UseFamilyStore'
import { FetchFamilyList } from '../../services/GetFamilyListApi'

const FamilyBoxWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 13px;
  max-height: 511px;
  width: 385px;
  top: 84px;
  left: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
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

const FamilyBoxBtn = styled.button<{ isHovered: boolean }>`
  box-sizing: border-box;
  height: 118px;
  padding: 0;
  border: 1px solid #ffccb6;
  border-radius: 9px;
  background: transparent;
  position: relative;
  flex-grow: ${({ isHovered }) => (isHovered ? 2 : 1)};
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

const SelectSvg = styled.svg<{ isHovered: boolean }>`
  position: absolute;
  left: 168px;
  top: 40px;
  display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
  width: 29px;
  height: 39px;
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

  const handleFamilyClick = (familyId: number) => {
    localStorage.setItem('familyId', String(familyId))
    navigate('/home')
  }

  return (
    <FamilyBoxWrap>
      {rows.map((rowFamilies, rowIndex) => (
        <Row
          key={rowIndex}
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
                <SelectSvg
                  isHovered={isHovered}
                  viewBox="0 0 29 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_i_643_103)">
                    <path
                      d="M3.72941e-06 1.95117L2.1951e-06 37.0522C0.00110844 37.4075 0.0984576 37.7559 0.281567 38.0597C0.464678 38.3635 0.726616 38.6113 1.03919 38.7764C1.35176 38.9415 1.70313 39.0176 2.05548 38.9966C2.40783 38.9755 2.7478 38.8582 3.03882 38.6571L28.2171 21.1066C29.261 20.3792 29.261 18.628 28.2171 17.8987L3.03882 0.348227C2.74841 0.14508 2.40826 0.02595 2.05533 0.00377983C1.7024 -0.0183903 1.35018 0.0572478 1.03694 0.222476C0.723709 0.387704 0.461433 0.636203 0.27862 0.940974C0.0958061 1.24575 -0.000553201 1.59513 3.72941e-06 1.95117Z"
                      fill="#FFA800"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_i_643_103"
                      x="0"
                      y="0"
                      width="29"
                      height="41"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_643_103"
                      />
                    </filter>
                  </defs>
                </SelectSvg>
                <FamilyMembers>
                  {family.familyMembers.slice(0, 6).map((member) => (
                    <MemberNickname key={member.familyMemberId}>
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
