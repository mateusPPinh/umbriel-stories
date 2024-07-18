import React, { type ReactElement } from 'react'
import styled from 'styled-components'
import { type Article, type BlockConfig } from '../PageBlock.types'

interface TemplateNewsletterProps {
  articles: Article[]
  config: BlockConfig
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const Header = styled.h2`
  font-size: 13px;
  color: #5A5A5A;
  font-family: 'mvpFont', sans-serif;
  text-transform: uppercase;
  line-height: 140%;
  margin-bottom: 8px;
`

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ArticleHeader = styled.h3`
  font-size: 19px;
  color: #121212;
  font-family: 'mvpFont', sans-serif;
  font-weight: bold;
  line-height: 120%;
`

const ArticleSubtitle = styled.p`
  font-size: 14px;
  color: #5A5A5A;
  font-family: 'mvpFont', sans-serif;
  margin-top: 4px;
`

const ArticleReadTime = styled.p`
  font-size: 14px;
  color: #5A5A5A;
  font-family: 'mvpFont', sans-serif;
  margin-top: 4px;
`

const Image = styled.img`
  margin-left: 8px;
  width: 64px;
  height: 64px;
  object-cover: cover;
  border-radius: 50%;
`

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  margin-top: 8px;
`

const TemplateNewsletter = ({ articles }: TemplateNewsletterProps): ReactElement => {
  const displayedArticles = articles.slice(0, 4)

  return (
    <Container>
      {displayedArticles.map((article, index) => (
        <React.Fragment key={index}>
          <ArticleContainer>
            {index === 0 && <Header>The Morning Newsletter</Header>}
            {index === 1 && <Header>In case you missed it</Header>}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <ArticleHeader>{article.title}</ArticleHeader>
                {index === 0 && <ArticleSubtitle>{article.subtitle}</ArticleSubtitle>}
                <ArticleReadTime>5 min read</ArticleReadTime>
              </div>
              {Boolean(article.content.image) && <Image src={article.content.image.desktop_image_path} alt={article.title} />}
            </div>
          </ArticleContainer>
          {index < displayedArticles.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Container>
  )
}

export default TemplateNewsletter
