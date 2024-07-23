import React, { useState } from 'react'
import styled from 'styled-components'
import { type Article } from '../PageBlock.types'
import BlurredImage from '../../../components/ImageBlur'
import Link from '../../Link'

interface TemplateWithImageAndArticlesProps {
  articles: Article[]
  blockTitle: string
  className?: string
}

const TemplateWithImageAndArticles: React.FC<
  TemplateWithImageAndArticlesProps
> = ({ articles, blockTitle, className }) => {
  const [loading, setIsLoading] = useState(false)

  if (articles.length === 0) {
    return <div>No articles available</div>
  }

  if (
    !articles[0]?.editorial ||
    !articles[0].slug ||
    !articles[0].content.image.desktop_image_path
  ) {
    console.error(
      'First article editorial, slug or image path is missing',
      articles[0]
    )
    return <div>Invalid first article data</div>
  }

  const validArticles = articles
    .slice(1, 3)
    .every((article) => article.editorial && article.slug)
  if (!validArticles) {
    console.error(
      'Some subsequent articles have missing editorial or slug data',
      articles.slice(1, 3)
    )
    return <div>Invalid subsequent article data</div>
  }

  return (
    <Container>
      <BlockTitle>{blockTitle}</BlockTitle>
      <MainContent>
        <LeftSection>
          <MainArticle>
            {articles[0].content.image.desktop_image_path && (
              <BlurredImage
                src={articles[0].content.image.desktop_image_path}
                alt={articles[0].title}
                loading="eager"
                decoding="async"
                isLoading={loading}
                onLoad={() => {
                  setIsLoading(false)
                }}
                className="w-full h-auto rounded-[8px] object-cover"
              />
            )}
            <Link
              href={`/${articles[0].editorial.slug}/${articles[0].slug}`}
              hover="hover:opacity-60"
            >
              <h2>{articles[0].title}</h2>
              <p>{articles[0].subtitle}</p>
            </Link>
          </MainArticle>
          <ArticlesList>
            {articles.slice(1, 3).map((article, index) => (
              <ArticlePreview key={index} $hasBorder={index < 2}>
                <Link
                  href={`/${article.editorial.slug}/${article.slug}`}
                  hover="hover:opacity-60"
                >
                  <h2>{article.title}</h2>
                  <p>{article.subtitle}</p>
                </Link>
              </ArticlePreview>
            ))}
          </ArticlesList>
        </LeftSection>
        <RightSection>
          {articles[3] &&
            articles[3].content.image.desktop_image_path.length > 0 && (
              <RightImage
                src={articles[3].content.image.desktop_image_path}
                alt="Right side image"
              />
            )}
        </RightSection>
      </MainContent>
    </Container>
  )
}

export default TemplateWithImageAndArticles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`

const BlockTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
`

const MainContent = styled.div`
  display: flex;
  gap: 20px;
`

const LeftSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const RightSection = styled.div`
  flex: 2;
`

// const MainImage = styled.img`
//   width: 100%;
//   height: auto;
//   border-radius: 8px;
//   object-fit: cover;
// `

const MainArticle = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid #ddd;

  h2,
  p {
    font-family: 'Lora Variable';
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

const ArticlesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ArticlePreview = styled.div<{ $hasBorder: boolean }>`
  background-color: transparent;
  padding: 10px;
  border-bottom: ${({ $hasBorder }) =>
    $hasBorder ? '1px solid #ddd' : 'none'};
  width: 100%;

  h2,
  p {
    font-family: 'Lora Variable';
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

const RightImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`
