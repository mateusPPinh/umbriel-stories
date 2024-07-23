import React from 'react'
import {
  ArticlePreview,
  Caption,
  Column,
  Container,
  Divider,
  DividerVertical,
  Image,
  ImageArea,
  VerticalDividerWrapper,
  ArticleTextArea,
  Description,
  Title,
} from './styles/TemplateFeatured.styles'
import { type Article, type BlockConfig } from '../PageBlock.types'
import Link from '../../Link'

interface TemplateFeaturedProps {
  articles: Article[]
  config: BlockConfig
}

const TemplateFeatured: React.FC<TemplateFeaturedProps> = ({ articles }) => {
  const isValidArticle = (article: Article) =>
    article &&
    article.editorial &&
    article.slug &&
    article.content.image.desktop_image_path

  if (
    articles.length < 3 ||
    !isValidArticle(articles[0]) ||
    !isValidArticle(articles[1]) ||
    !isValidArticle(articles[2])
  ) {
    console.error(
      'Some articles are missing required fields or there are not enough articles',
      articles
    )
    return <div>Invalid article data</div>
  }

  return (
    <Container>
      <ImageArea>
        <Image
          src={articles[0].content.image.desktop_image_path}
          alt={articles[0].title}
        />
      </ImageArea>
      <Caption>The captions here.</Caption>
      <ArticleTextArea>
        <Link
          href={`/${articles[0].editorial.slug}/${articles[0].slug}`}
          hover="hover:opacity-60"
        >
          <Title>
            <h2>{articles[0].title}</h2>
          </Title>
          <Description>
            <p>{articles[0].subtitle}</p>
          </Description>
        </Link>
      </ArticleTextArea>
      <Divider />
      <VerticalDividerWrapper>
        <Column>
          <ArticlePreview>
            <Link
              href={`/${articles[1].editorial.slug}/${articles[1].slug}`}
              hover="hover:opacity-60"
            >
              <h2>{articles[1].title}</h2>
              <p>{articles[1].subtitle}</p>
            </Link>
            {articles[1].content.image.desktop_image_path.length > 0 && (
              <Image
                src={articles[1].content.image.desktop_image_path}
                alt={articles[1].title}
              />
            )}
          </ArticlePreview>
        </Column>
        <DividerVertical />
        <Column>
          <ArticlePreview>
            <Link
              href={`/${articles[2].editorial.slug}/${articles[2].slug}`}
              hover="hover:opacity-60"
            >
              <h2>{articles[2].title}</h2>
              <p>{articles[2].subtitle}</p>
            </Link>
            {articles[2].content.image.desktop_image_path.length > 0 && (
              <Image
                src={articles[2].content.image.desktop_image_path}
                alt={articles[2].title}
              />
            )}
          </ArticlePreview>
        </Column>
      </VerticalDividerWrapper>
    </Container>
  )
}

export default TemplateFeatured
