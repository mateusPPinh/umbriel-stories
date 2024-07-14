import React from 'react'
import styled from 'styled-components'
import { type Article } from '../PageBlock.types'

interface LayoutThreeColumnsProps {
  articles: Article[]
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ArticlePreview = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;

  h2,
  p {
    font-family: ${(props) => props.theme.fonts.mvpFont};
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
  border-radius: 8px;
`

const LayoutThreeColumns: React.FC<LayoutThreeColumnsProps> = ({ articles }) => {
  return (
    <Container>
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
        </Column>
      ))}
    </Container>
  )
}

export default LayoutThreeColumns
