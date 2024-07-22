import React from 'react'
import {
  ArticlePreview,
  CenterColumn,
  Container,
  Image,
  MainColumn,
  SidebarColumn,
  BorderBottom,
} from './styles/TemplateMainWithSidebar.styles'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'

interface TemplateMainWithSidebarProps {
  articles: Article[]
}

const TemplateMainWithSidebar: React.FC<TemplateMainWithSidebarProps> = ({
  articles,
}) => {
  return (
    <>
      <Container>
        <MainColumn>
          {articles.slice(0, 4).map((article, index) => (
            <ArticlePreview key={index} $hasBorder={index < 3}>
              <Link
                href={`/${article.editorial.slug}/${article.slug}`}
                hover="hover:opacity-60"
              >
                <h2>{article.title}</h2>
                <p>{article.subtitle}</p>
              </Link>
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
          <ArticlePreview $hasBorder={false}>
            <Link
              href={`/${articles[4].editorial.slug}/${articles[4].slug}`}
              hover="hover:opacity-60"
            >
              <h2>{articles[4].title}</h2>
              <p>{articles[4].subtitle}</p>
            </Link>
          </ArticlePreview>
        </CenterColumn>
        <SidebarColumn>
          {articles.slice(5).map((article, index) => (
            <ArticlePreview
              key={index}
              $hasBorder={index < articles.slice(5).length - 1}
            >
              <Link
                href={`/${article.editorial.slug}/${article.slug}`}
                hover="hover:opacity-60"
              >
                <h2>{article.title}</h2>
                <p>{article.subtitle}</p>
              </Link>
            </ArticlePreview>
          ))}
        </SidebarColumn>
      </Container>
      <BorderBottom />
    </>
  )
}

export default TemplateMainWithSidebar
