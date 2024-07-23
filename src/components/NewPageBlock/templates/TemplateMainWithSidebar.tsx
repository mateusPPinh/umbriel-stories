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
  const isValidArticle = (article: Article) =>
    article &&
    article.editorial &&
    article.slug &&
    article.title &&
    article.subtitle &&
    article.content &&
    article.content.image &&
    article.content.image.desktop_image_path

  const mainArticles = articles.slice(0, 4).filter(isValidArticle)
  const centerArticle = isValidArticle(articles[0]) ? articles[0] : null
  const sidebarArticles = articles.slice(5).filter(isValidArticle)
  const extraArticle = isValidArticle(articles[4]) ? articles[4] : null

  return (
    <>
      <Container>
        <MainColumn>
          {mainArticles.map((article, index) => (
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
          {centerArticle &&
            centerArticle.content.image.desktop_image_path.length > 0 && (
              <Image
                src={centerArticle.content.image.desktop_image_path}
                alt={centerArticle.title}
              />
            )}
          {extraArticle && (
            <ArticlePreview $hasBorder={false}>
              <Link
                href={`/${extraArticle.editorial.slug}/${extraArticle.slug}`}
                hover="hover:opacity-60"
              >
                <h2>{extraArticle.title}</h2>
                <p>{extraArticle.subtitle}</p>
              </Link>
            </ArticlePreview>
          )}
        </CenterColumn>
        <SidebarColumn>
          {sidebarArticles.map((article, index) => (
            <ArticlePreview
              key={index}
              $hasBorder={index < sidebarArticles.length - 1}
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
