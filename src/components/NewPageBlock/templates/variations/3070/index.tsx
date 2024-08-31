import React, { Fragment, memo, type ReactElement } from 'react'
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
        <p className="articleSubtitle">{article.subtitle}</p>
      </Link>
      {/* {(article.articleEstimatedReadTime ?? '').length > 0 && (
        <span className="articleEstimatedReadTime">
          {article.articleEstimatedReadTime} MIN READ
        </span>
      )} */}
    </ArticlePreview>
  )
})

interface T3070VariationProps {
  articles: Article[]
}

export default function T3070Variation({
  articles,
}: T3070VariationProps): ReactElement {
  const [firstArticle, secondArticle, thirdArticle, ...restArticles] = articles

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
      <ShouldRenderXBorderBottomDivider customStyles="borderXCustomClass" />
      <ShouldRenderYBorderRightDivider
        customStyles="borderYCustomClass"
        borderYRightPadding="10px"
      />
    </Container>
  )
}
