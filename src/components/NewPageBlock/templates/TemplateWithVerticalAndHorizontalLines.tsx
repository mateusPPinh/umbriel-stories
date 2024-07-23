import React from 'react'
import {
  ArticlePreview,
  BlockTitle,
  Container,
  Image,
  MainArticle,
  MainContent,
  MainImage,
  Sidebar,
} from './styles/TemplateWithVerticalAndHorizontalLines.styles'
import { type Article } from '../PageBlock.types'
import Link from '../../Link'

interface TemplateWithVerticalAndHorizontalLinesProps {
  articles: Article[]
  blockTitle: string
}

const TemplateWithVerticalAndHorizontalLines: React.FC<
  TemplateWithVerticalAndHorizontalLinesProps
> = ({ articles, blockTitle }) => {
  const isValidArticle = (article: Article) =>
    article &&
    article.title &&
    article.subtitle &&
    article.content &&
    article.content.image &&
    article.content.image.desktop_image_path

  if (!articles[0] || !isValidArticle(articles[0])) {
    console.error('The main article is missing required fields', articles[0])
    return <div>Invalid main article data</div>
  }

  const validSidebarArticles = articles.slice(1, 5).filter(isValidArticle)
  const validGridArticles = articles.slice(5).filter(isValidArticle)

  return (
    <Container>
      <BlockTitle>{blockTitle}</BlockTitle>
      <MainContent>
        <div>
          {articles[0].content.image.desktop_image_path.length > 0 && (
            <MainImage
              src={articles[0].content.image.desktop_image_path}
              alt={articles[0].title}
            />
          )}
          <MainArticle>
            <Link
              href={`/${articles[0].editorial.slug}/${articles[0].slug}`}
              hover="hover:opacity-60"
            >
              <h2>{articles[0].title}</h2>
              <p>{articles[0].subtitle}</p>
            </Link>
          </MainArticle>
        </div>
        <Sidebar>
          {validSidebarArticles.map((article, index) => (
            <ArticlePreview
              key={index}
              $hasBorder={index < 3}
              $hasVerticalBorder={index % 2 === 0}
            >
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
        </Sidebar>
      </MainContent>
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {validGridArticles.map((article, index) => (
            <ArticlePreview
              key={index}
              $hasBorder={index < validGridArticles.length - 1}
            >
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
        </div>
      </div>
    </Container>
  )
}

export default TemplateWithVerticalAndHorizontalLines
