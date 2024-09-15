import { type ReactElement } from 'react'
import styled from 'styled-components'

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 425px) {
    grid-template-columns: repeat(2, 3fr);
    padding: 10px;
    height: 100%;
    width: 100%;
  }
`

const ArticlePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  height: 195px;
  width: 231px;
  background-color: #d1d5db;
  border-radius: 8px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export default function ArticleSkeleton(): ReactElement {
  return (
    <ArticleGrid>
      <ArticlePreview></ArticlePreview>
      <ArticlePreview></ArticlePreview>
      <ArticlePreview></ArticlePreview>
      <ArticlePreview></ArticlePreview>
      <ArticlePreview></ArticlePreview>
    </ArticleGrid>
  )
}
