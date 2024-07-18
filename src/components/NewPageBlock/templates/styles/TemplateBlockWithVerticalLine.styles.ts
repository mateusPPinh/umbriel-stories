import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`

const BlockTitle = styled.h2`
  font-size: 13px;
  line-height: 140%;
  margin-bottom: 1rem;
  font-weight: bold;
  font-family: 'Inter Variable';
  color: #121212
`

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const ArticlePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  border-left: 1px solid #ddd;

  &:first-child {
    border-left: none;
  }

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

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`

export {
  ArticleGrid,
  ArticlePreview,
  BlockTitle,
  Container,
  Image
}
