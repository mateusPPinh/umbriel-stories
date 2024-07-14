import React from 'react'
import styled from 'styled-components'
import { type Article, type BlockConfig } from '../PageBlock.types'

interface TemplateMVPProps {
  articles: Article[]
  config: BlockConfig
}

const Container = styled.div<{ layout: string }>`
  display: grid;
  grid-template-areas: ${({ layout }) => layout};
  gap: 20px;
`

const Column = styled.div<{ gridArea: string }>`
  grid-area: ${({ gridArea }) => gridArea};
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

const TemplateMVP: React.FC<TemplateMVPProps> = ({ articles, config }) => {
  const { columns, layout } = config
  return (
    <Container layout={layout}>
    {layout === '"col1 col2"'
      ? (
      <>
        <Column gridArea="col1">
          <ArticlePreview key={0}>
            <h2>{articles[0].title}</h2>
            <p>{articles[0].subtitle}</p>
          </ArticlePreview>
        </Column>
        <Column gridArea="col2">
          <ArticlePreview key={0}>
            {(articles[0].content.image.desktop_image_path.length > 0) && (
              <Image src={articles[0].content.image.desktop_image_path} alt={articles[0].title} />
            )}
          </ArticlePreview>
        </Column>
      </>
        )
      : (
          columns.map((column, index) => (
        <Column key={index} gridArea={`col${index + 1}`}>
          {articles.slice(2 * index, 2 * (index + 1)).map((article, idx) => (
            <ArticlePreview key={idx}>
              {(article.content.image.desktop_image_path.length > 0) && (
                <Image src={article.content.image.desktop_image_path} alt={article.title} />
              )}
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
            </ArticlePreview>
          ))}
        </Column>
          ))
        )}
  </Container>
  )
}

export default TemplateMVP
