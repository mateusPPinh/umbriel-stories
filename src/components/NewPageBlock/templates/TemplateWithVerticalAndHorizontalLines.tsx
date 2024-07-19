import React from 'react'
import {
  ArticlePreview,
  BlockTitle,
  Container,
  Image,
  MainArticle,
  MainContent,
  MainImage,
  Sidebar
} from './styles/TemplateWithVerticalAndHorizontalLines.styles'
import { type Article } from '../PageBlock.types'

interface TemplateWithVerticalAndHorizontalLinesProps {
  articles: Article[]
  blockTitle: string
}

const TemplateWithVerticalAndHorizontalLines: React.FC<
TemplateWithVerticalAndHorizontalLinesProps
> = ({ articles, blockTitle }) => {
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
            <h2>{articles[0].title}</h2>
            <p>{articles[0].subtitle}</p>
          </MainArticle>
        </div>
        <Sidebar>
          {articles.slice(1, 5).map((article, index) => (
            <ArticlePreview key={index} $hasBorder={index < 3} $hasVerticalBorder={index % 2 === 0}>
              {article.content.image.desktop_image_path.length > 0 && (
                <Image
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                />
              )}
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
            </ArticlePreview>
          ))}
        </Sidebar>
      </MainContent>
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles.slice(5).map((article, index) => (
            <ArticlePreview key={index} $hasBorder={index < articles.slice(5).length - 1}>
              {article.content.image.desktop_image_path.length > 0 && (
                <Image
                  src={article.content.image.desktop_image_path}
                  alt={article.title}
                />
              )}
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
            </ArticlePreview>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default TemplateWithVerticalAndHorizontalLines
