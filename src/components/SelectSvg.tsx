import styled from '@emotion/styled'

const SelectSvg = styled.svg<{ isHovered: boolean }>`
  position: absolute;
  left: 168px;
  top: 40px;
  display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
  width: 36px;
  height: 39px;
`
const SvgIcon = ({ isHovered }: { isHovered: boolean }) => (
  <SelectSvg
    isHovered={isHovered}
    viewBox="1 0 29 39"
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
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
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
)

export default SvgIcon
