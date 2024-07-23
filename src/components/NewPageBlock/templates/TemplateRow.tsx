import React from 'react'
import { styled } from 'styled-components'
import { type Article } from '../PageBlock.types'

interface TemplateRowProps {
  articles: Article[]
}

const Container = styled.div`
  display: flex;
  gap: 20px;
`

const ArticlePreview = styled.div`
  background-color: blue;
  padding: 10px;
  border-radius: 8px;
  flex: 1;
`

const TemplateRow: React.FC<TemplateRowProps> = ({ articles }) => {
  const isValidArticle = (article: Article) =>
    article && article.title && article.subtitle

  return (
    <Container>
      {articles
        .slice(0, 3)
        .filter(isValidArticle)
        .map((article) => (
          <ArticlePreview key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>
          </ArticlePreview>
        ))}
    </Container>
  )
}

export default TemplateRow
