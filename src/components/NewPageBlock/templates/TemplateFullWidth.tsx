import React from 'react'
import {
  ArticlePreview,
  Container,
  Image,
} from './styles/TemplateFullWidth.styles'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'

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
          <Link
            href={`/${article.editorial.slug}/${article.slug}`}
            hover="hover:opacity-60"
          >
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>
          </Link>
        </ArticlePreview>
      ))}
    </Container>
  )
}

export default LayoutFullWidth
