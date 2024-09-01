/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactElement, memo, Fragment } from 'react'
import Link from '../../../../Link'

import { type Article } from '../../../PageBlock.types'
import {
  Container,
  ArticlePreview,
  Column,
  Image,
  SideColumn,
  ArticleRow,
  ArticleRowContainer,
  Divider,
  MainContent,
  NewsletterContainer,
  NewsletterSection,
  DividerBottom,
  NewsletterPreview,
} from '../../styles/T7030WihtinNewsletter.styles'

const ArticleCard = memo(({ article }: { article: Article }) => {
  if (!article.editorial || !article.slug) {
    console.error('Article editorial or slug is missing', article)
    return null
  }

  return (
    <ArticlePreview className="articlePreview">
      {/* {article.isArticleLive === true ? (
        <LiveBadge className="liveBadge">LIVE 16m ago</LiveBadge>
      ) : (
        <></>
      )} */}
      <Link
        href={`/${article.editorial.slug}/${article.slug}`}
        hover="hover:opacity-60"
      >
        <h2 className="articleTitle">{article.title}</h2>
      </Link>
      <p className="articleSubtitle">{article.subtitle}</p>
      {/* {(article.articleEstimatedReadTime ?? '').length > 0 && (
        <span className="articleEstimatedReadTime">
          {article.articleEstimatedReadTime} MIN READ
        </span>
      )} */}
    </ArticlePreview>
  )
})

const NewsletterCard = memo(({ article }: { article: Article }) => {
  if (!article.editorial || !article.slug) {
    console.error('Article editorial or slug is missing', article)
    return null
  }

  return (
    <NewsletterPreview>
      {/* {article.isArticleLive === true ? (
        <LiveBadge className="liveBadge">LIVE 16m ago</LiveBadge>
      ) : (
        <></>
      )} */}
      <Link
        href={`/${article.editorial.slug}/${article.slug}`}
        hover="hover:opacity-60"
      >
        <h2 className="newsletter_articleTitle">{article.title}</h2>
      </Link>
    </NewsletterPreview>
  )
})

interface T7030WithinNewsletterProps {
  articles: Article[]
}

export default function T7030WithinNewsletter({
  articles,
}: T7030WithinNewsletterProps): ReactElement {
  const [
    firstArticle,
    secondArticle,
    thirdArticle,
    fourthArticle,
    fifthArticle,
    sixthArticle,
    seventhArticle,
    eighthArticle,
    ninthArticle,
    ...restArticles
  ] = articles

  if (!firstArticle?.editorial || firstArticle.slug.length === 0) {
    console.error('First article editorial or slug is missing', firstArticle)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    return null
  }
  return (
    <Container>
      <MainContent>
        <Column>
          <ArticleCard article={firstArticle} />
          <Divider />
          <ArticleCard article={secondArticle} />
          <Divider />
          <ArticleCard article={thirdArticle} />
        </Column>
        <SideColumn>
          <Image
            src={firstArticle.content.image.desktop_image_path}
            alt={firstArticle.title}
            loading="lazy"
          />
        </SideColumn>
        <NewsletterContainer>
          <div className="border-l border-gray-300" />
          <NewsletterSection>
            <div>
              <Link
                href={`/${fourthArticle.editorial.slug}/${fourthArticle.slug}`}
                hover="hover:opacity-60"
              >
                <h3>{fourthArticle.title}</h3>
              </Link>
              <Image
                src={fourthArticle.content.image.desktop_image_path}
                alt={fourthArticle.title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <DividerBottom />
            <NewsletterCard article={fifthArticle} />
            <DividerBottom />
            <NewsletterCard article={sixthArticle} />
            <DividerBottom />
            <NewsletterCard article={seventhArticle} />
            <DividerBottom />
            <NewsletterCard article={eighthArticle} />
            <DividerBottom />
            <NewsletterCard article={ninthArticle} />
          </NewsletterSection>
        </NewsletterContainer>
      </MainContent>
      <div className="border-t bg-gray-300" />
      <ArticleRowContainer>
        {restArticles.slice(0, 4).map((article, i) => (
          <Fragment key={i}>
            <ArticleRow>
              {article.editorial && article.slug ? (
                <Link
                  href={`/${article.editorial.slug}/${article.slug}`}
                  hover="hover:opacity-60"
                >
                  <h2>{article.title}</h2>
                  <p>{article.subtitle}</p>
                </Link>
              ) : (
                <p>Article link is missing</p>
              )}
            </ArticleRow>
          </Fragment>
        ))}
      </ArticleRowContainer>
    </Container>
  )
}
