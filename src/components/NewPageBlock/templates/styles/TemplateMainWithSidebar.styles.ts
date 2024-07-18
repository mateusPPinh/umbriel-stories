import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  gap: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 20px;
    border-bottom: 0;

    > div {
      flex: 0 0 450px;
    }
  }
`

export const ArticlePreview = styled.div<{ hasBorder: boolean }>`
  background-color: transparent;
  padding: 10px;
  border-bottom: ${({ hasBorder }) => (hasBorder ? '1px solid #ddd' : 'none')};
  width: 100%;

  h2,
  p {
    font-family: 'Lora Variable';
  }

  h2 {
    font-weight: bold;
    line-height: 140%;
    font-size: 19px;
  }

  p {
    font-size: 13px;
    line-height: 140%;
    color: #5a5a5a;
  }
`

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`

export const BorderTop = styled.div`
  border: 1px solid #121212;
  margin: 0.8rem 0;
`

export const BorderBottom = styled.div`
  border: 1px solid #121212;
  margin: 0.8rem 0;
`
