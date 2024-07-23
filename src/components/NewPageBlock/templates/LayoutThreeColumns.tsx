import React from 'react'
import {
  ArticlePreview,
  Column,
  Container,
  Image,
  BlockTitle,
  ContentWrapper,
  DividerVertical,
} from './styles/LayoutThreeColumns.styles'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'

interface LayoutThreeColumnsProps {
  articles: Article[]
  blockTitle: string
}

const LayoutThreeColumns: React.FC<LayoutThreeColumnsProps> = ({
  articles,
  blockTitle = 'LayoutThreeColumns',
}) => {
  const isValidArticle = (article: Article) =>
    article &&
    article.editorial &&
    article.slug &&
    article.content.image.desktop_image_path

  return (
    <Container>
      <BlockTitle>{blockTitle}</BlockTitle>
      <ContentWrapper>
        {[0, 1, 2].map((colIndex) => (
          <Column key={colIndex}>
            {articles
              .slice(2 * colIndex, 2 * (colIndex + 1))
              .filter(isValidArticle)
              .map((article, index) => (
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
            {colIndex < 2 && <DividerVertical />}
          </Column>
        ))}
      </ContentWrapper>
    </Container>
  )
}

export default LayoutThreeColumns
