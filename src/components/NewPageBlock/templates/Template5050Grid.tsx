import React from 'react'
import styled from 'styled-components'
import { type Article, type BlockConfig } from '../PageBlock.types'
import Link from '../../Link'

interface Template5050GridProps {
  blockTitle?: string
  articles: Article[]
  config: BlockConfig
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  font-family: 'Rubik Variable';
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
`

const Subtitle = styled.p`
  font-family: 'Rubik Variable';
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`

const Template5050Grid: React.FC<Template5050GridProps> = ({
  articles,
  blockTitle,
}) => {
  return (
    <Container>
      {blockTitle != null && <BlockTitle>{blockTitle}</BlockTitle>}
      {articles.map((article, index) => (
        <ArticleContainer key={index}>
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
      ))}
    </Container>
  )
}

export default Template5050Grid
