import React, { Fragment, memo, type ReactElement } from 'react'
import {
  Container,
  ArticlePreview,
  Column,
  Image,
  SideColumn,
  LiveBadge,
  UpdatesContainer,
  Update,
  ArticleRow,
  ArticleRowContainer,
  Divider,
  MainContent,
} from './styles'
import ShouldRenderXBorderBottomDivider from '../../../conditions/ShouldRenderXBorderBottomDivider'
import ShouldRenderYBorderRightDivider from '../../../conditions/ShouldRenderYBorderRightDivider'
import Link from '../../../../Link'

import { type Article } from '../../../PageBlock.types'

interface T3070VariationProps {
  articles: Article[]
}

// eslint-disable-next-line react/display-name
const ArticleCard = memo(({ article }: { article: Article }) => {
  if (!article.editorial || !article.slug) {
    console.error('Article editorial or slug is missing', article)
    return null
  }

  return (
    <ArticlePreview>
      {article.isArticleLive === true ? (
        <LiveBadge>LIVE 16m ago</LiveBadge>
      ) : (
        <></>
      )}
      <Link
        href={`/${article.editorial.slug}/${article.slug}`}
        hover="hover:opacity-60"
      >
        <h2>{article.title}</h2>
        <p>{article.subtitle}</p>
      </Link>
      {(article.articleEstimatedReadTime ?? '').length > 0 && (
        <span>{article.articleEstimatedReadTime} MIN READ</span>
      )}
    </ArticlePreview>
  )
})

interface T3070VariationProps {
  articles: Article[]
}

export default function T3070Variation({
  articles,
}: T3070VariationProps): ReactElement {
  const [firstArticle, secondArticle, ...restArticles] = articles

  if (!firstArticle?.editorial || firstArticle.slug.length === 0) {
    console.error('First article editorial or slug is missing', firstArticle)
    // @ts-expect-error
    return null
  }

  return (
    <Container>
      <MainContent>
        <Column>
          <ArticleCard article={firstArticle} />
          <Divider />
          <ArticleCard article={secondArticle} />
          <UpdatesContainer>
            <span>See more updates</span>
            <Update>9+</Update>
          </UpdatesContainer>
        </Column>
        <SideColumn>
          <Image
            src={firstArticle.content.image.desktop_image_path}
            alt={firstArticle.title}
          />
          <div className="captions">The captions here.</div>
        </SideColumn>
      </MainContent>
      <div className="border-t bg-gray-300" />
      <ArticleRowContainer>
        {restArticles.slice(0, 3).map((article, i) => (
          <Fragment key={i}>
            <ArticleRow>
              {article.isArticleLive ?? false ? (
                <LiveBadge>LIVE 16m ago</LiveBadge>
              ) : (
                article.articleEstimatedReadTime != null && (
                  <span>{article.articleEstimatedReadTime} MIN READ</span>
                )
              )}
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
              {article.articleEstimatedReadTime != null && (
                <span>{article.articleEstimatedReadTime}</span>
              )}
            </ArticleRow>
          </Fragment>
        ))}
      </ArticleRowContainer>
      <ShouldRenderXBorderBottomDivider />
      <ShouldRenderYBorderRightDivider borderYRightPadding="10px" />
    </Container>
  )
}
