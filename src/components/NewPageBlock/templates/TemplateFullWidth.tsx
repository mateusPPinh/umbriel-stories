import React from 'react'
import {
  ArticlePreview,
  Container,
  Image
} from './styles/TemplateFullWidth.styles'
import { type Article } from '../PageBlock.types'

interface LayoutFullWidthProps {
  articles: Article[]
}

const LayoutFullWidth: React.FC<LayoutFullWidthProps> = ({ articles }) => {
  return (
    <Container>
      {articles.map((article, index) => (
        <ArticlePreview key={index}>
          {article.content.image.desktop_image_path.length > 0 && (
            <Image
              src={article.content.image.desktop_image_path}
              alt={article.title}
            />
          )}
          <h2>{article.title}</h2>
          <p>{article.subtitle}</p>
        </ArticlePreview>
      ))}
    </Container>
  )
}

export default LayoutFullWidth
