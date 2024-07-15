import React from 'react'
import { ArticlePreview, Column, Container, Image, BlockTitle, ContentWrapper, DividerVertical } from './styles/LayoutThreeColumns.styles'
import { type Article } from '../PageBlock.types'

interface LayoutThreeColumnsProps {
  articles: Article[]
  blockTitle: string
}

const LayoutThreeColumns: React.FC<LayoutThreeColumnsProps> = ({ articles, blockTitle = 'LayoutThreeColumns' }) => {
  return (
    <Container>
      <BlockTitle>{blockTitle}</BlockTitle>
      <ContentWrapper>
        {[0, 1, 2].map((colIndex) => (
          <Column key={colIndex}>
            {articles.slice(2 * colIndex, 2 * (colIndex + 1)).map((article, index) => (
              <ArticlePreview key={index}>
                {article.content.image.desktop_image_path.length > 0 && (
                  <Image src={article.content.image.desktop_image_path} alt={article.title} />
                )}
                <h2>{article.title}</h2>
                <p>{article.subtitle}</p>
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
