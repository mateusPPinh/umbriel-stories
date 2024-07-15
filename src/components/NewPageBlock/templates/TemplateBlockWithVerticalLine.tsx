import React from 'react'
import {
  ArticleGrid,
  ArticlePreview,
  BlockTitle,
  Container,
  Image
} from './styles/TemplateBlockWithVerticalLine.styles'
import { type Article } from '../PageBlock.types'

interface TemplateBlockWithVerticalLineProps {
  articles: Article[]
  blockTitle: string
}

const TemplateBlockWithVerticalLine: React.FC<
TemplateBlockWithVerticalLineProps
> = ({ articles, blockTitle = 'TemplateBlockWithVerticalLine' }) => {
  return (
    <Container>
      <BlockTitle>{blockTitle}</BlockTitle>
      <ArticleGrid>
        {articles.map((article, index) => (
          <ArticlePreview key={index}>
            {article.content.image.desktop_image_path.length > 0 && (
              <Image src={article.content.image.desktop_image_path} alt={article.title} />
            )}
            <h2>{article.title}</h2>
            <p>{article.subtitle}</p>
          </ArticlePreview>
        ))}
      </ArticleGrid>
    </Container>
  )
}

export default TemplateBlockWithVerticalLine
