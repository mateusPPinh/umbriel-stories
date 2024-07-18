import React from 'react'
import {
  ArticlePreview,
  CenterColumn,
  Container,
  Image,
  MainColumn,
  SidebarColumn,
  BorderBottom,
  BorderTop
} from './styles/TemplateMainWithSidebar.styles'
import { type Article } from '../PageBlock.types'

interface TemplateMainWithSidebarProps {
  articles: Article[]
}

const TemplateMainWithSidebar: React.FC<TemplateMainWithSidebarProps> = ({
  articles
}) => {
  return (
    <>
      <BorderTop />
      <Container>
        <MainColumn>
          {articles.slice(0, 4).map((article, index) => (
            <ArticlePreview key={index} hasBorder={index < 3}>
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
            </ArticlePreview>
          ))}
        </MainColumn>
        <CenterColumn>
          {articles[0].content.image.desktop_image_path.length > 0 && (
            <Image
              src={articles[0].content.image.desktop_image_path}
              alt={articles[0].title}
            />
          )}
          <ArticlePreview hasBorder={false}>
            <h2>{articles[4].title}</h2>
            <p>{articles[4].subtitle}</p>
          </ArticlePreview>
        </CenterColumn>
        <SidebarColumn>
          {articles.slice(5).map((article, index) => (
            <ArticlePreview key={index} hasBorder={index < articles.slice(5).length - 1}>
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
            </ArticlePreview>
          ))}
        </SidebarColumn>
      </Container>
      <BorderBottom />
    </>
  )
}

export default TemplateMainWithSidebar
