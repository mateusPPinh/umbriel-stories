import { type ReactElement } from 'react'
import styled from 'styled-components'

const Container = styled.div``

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 34.5% 64%;
  gap: 20px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: center;
`

const BottomSection = styled.div`
  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @media (max-width: 425px) {
    div {
      display: flex;
      flex-direction: column;
    }
  }
`

const Card = styled.div`
  height: 238px;
  background-color: #d1d5db;
  border-radius: 8px;
  margin-bottom: 16px;
`

export default function Skeleton(): ReactElement {
  return (
    <Container>
      <MainContent>
        <Column>
          <Card style={{ height: '20px', width: '100%' }}></Card>
          <Card style={{ height: '20px', width: '50%' }}></Card>
        </Column>
        <Card style={{ height: '450px', width: '100%' }}></Card>
      </MainContent>
      <BottomSection>
        <div>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </BottomSection>
    </Container>
  )
}
