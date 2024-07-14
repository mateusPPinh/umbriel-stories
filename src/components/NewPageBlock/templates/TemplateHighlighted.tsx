import React from 'react'
import styled from 'styled-components'
import { type Article } from '../PageBlock.types'

interface TemplateHighlightedProps {
  articles: Article[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ArticlePreview = styled.div`
  background-color: red;
  padding: 10px;
  border-radius: 8px;
`

const TemplateHighlighted: React.FC<TemplateHighlightedProps> = ({ articles }) => {
  return (
    <Container>
      {articles.slice(0, 2).map((article) => (
        <ArticlePreview key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.subtitle}</p>
        </ArticlePreview>
      ))}
    </Container>
  )
}

export default TemplateHighlighted
