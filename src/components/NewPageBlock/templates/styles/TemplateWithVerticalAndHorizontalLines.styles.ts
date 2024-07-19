import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`

export const BlockTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
`

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`

export const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`

export const MainArticle = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid #ddd;

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

export const Sidebar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const ArticlePreview = styled.div<{ $hasBorder: boolean, $hasVerticalBorder?: boolean }>`
  background-color: transparent;
  padding: 10px;
  border-bottom: ${({ $hasBorder }) => ($hasBorder ? '1px solid #ddd' : 'none')};
  border-right: ${({ $hasVerticalBorder }) => (($hasVerticalBorder ?? false) ? '1px solid #ddd' : 'none')};
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
`
