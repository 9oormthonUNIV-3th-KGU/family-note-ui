import styled from '@emotion/styled'
import { IconType } from 'react-icons'

interface Props {
  item: string
  index: number
  icon: IconType
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 381px;
  height: 62px;
  border-bottom: 1px solid #5b5b5b;
  margin-top: 22px;
  padding-left: 18px;
  padding-right: 18px;
  box-sizing: border-box;
  flex-shrink: 0;
`

const Text = styled.p`
  position: relative;
  top: 6px;
  margin: 0;
  padding: 0;
  font-family: Inter;
  font-style: normal;
  font-size: 24px;
  font-weight: 500;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  color: #7f7f7f;
  width: 40px;
  height: 40px;
  border: 2px solid #808080;
  border-radius: 50%;
`

const ListItem = ({ item, index, icon: IconComponent }: Props) => {
  return (
    <Container key={index}>
      <Text>{item}</Text>
      <Icon>
        <IconComponent size={24}></IconComponent>
      </Icon>
    </Container>
  )
}

export default ListItem
