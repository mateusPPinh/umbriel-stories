import React from 'react'
import styled from 'styled-components'
import { type Article, type BlockConfig } from '../PageBlock.types'
import Link from '../../Link'

interface Template5050GridProps {
  blockTitle?: string
  articles: Article[]
  config: BlockConfig
  articlesLayout: {
    rows: Array<{ slugs: string[] }>
  }
  articlesPerRow?: number
  customGrid5050Style?: string
  customGrid505ArticleContainerStyle?: string
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const BlockTitle = styled.h2`
  grid-column: span 2;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
`

const Title = styled.h3`
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
`

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Template5050Grid: React.FC<Template5050GridProps> = ({
  articles,
  blockTitle,
  articlesLayout,
  articlesPerRow = 2,
  customGrid5050Style,
  customGrid505ArticleContainerStyle,
}) => {
  const processLayoutRows = () => {
    return articlesLayout.rows.map((row) => ({
      articles: row.slugs
        .map((slug) => articles.find((a) => a.slug === slug))
        .filter(Boolean) as Article[],
    }))
  }

  const chunkArticles = (articles: Article[], size: number) => {
    const result: Article[][] = []
    for (let i = 0; i < articles.length; i += size) {
      result.push(articles.slice(i, i + size))
    }
    return result
  }

  const renderColumn = (articles: Article[]) => {
    return articles.map((article, index) => {
      if (!article?.editorial || !article?.slug) return null

      return (
        <ArticleContainer
          key={index}
          className={customGrid505ArticleContainerStyle}
        >
          <Image
            src={article.content.image.desktop_image_path}
            alt={article.title}
          />
          <Link
            href={`/${article.editorial.slug}/${article.slug}`}
            hover="hover:opacity-60"
          >
            <Title>{article.title}</Title>
          </Link>
          <Subtitle>{article.subtitle}</Subtitle>
        </ArticleContainer>
      )
    })
  }

  const rows = processLayoutRows()

  return (
    <MainContainer className={customGrid5050Style}>
      {blockTitle && <BlockTitle>{blockTitle}</BlockTitle>}

      {rows.map((row, rowIndex) => {
        const chunked = chunkArticles(row.articles, articlesPerRow)

        return chunked.map((chunk, chunkIndex) => (
          <Row key={`${rowIndex}-${chunkIndex}`}>
            {chunk.map((article, index) => (
              <Column key={index}>{renderColumn([article])}</Column>
            ))}
            {/* Preencher colunas vazias para manter o layout 50/50 */}
            {chunk.length < 2 && <Column />}
          </Row>
        ))
      })}
    </MainContainer>
  )
}

export default Template5050Grid
