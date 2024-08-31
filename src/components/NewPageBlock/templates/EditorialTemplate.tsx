/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { Fragment, memo, type ReactElement } from 'react'
import Link from '../../../components/Link'
import {
  Container,
  MainContent,
  ArticlePreview,
  Column,
  Image,
  BottomSection,
} from './styles/EditorialTemploate.styles'

import { type Article } from '../PageBlock.types'
import { SideColumn } from './variations/3070/styles'

interface EditorialTemplateProps {
  articles: Article[]
}

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
      <p className="articleAuthor">Por: {article.author}</p>
      {/* {(article.articleEstimatedReadTime ?? '').length > 0 && (
        <span className="articleEstimatedReadTime">
          {article.articleEstimatedReadTime} MIN READ
        </span>
      )} */}
    </ArticlePreview>
  )
})

export default function EditorialTemplate({
  articles,
}: EditorialTemplateProps): ReactElement {
  const [firstArticle, ...restArticles] = articles
  return (
    <Container>
      <MainContent>
        <Column>
          <ArticleCard article={firstArticle} />
        </Column>
        <SideColumn>
          <Image
            src={firstArticle.content.image.desktop_image_path}
            alt={firstArticle.title}
            loading="lazy"
          />
        </SideColumn>
      </MainContent>
      <div className="border-t bg-gray-300 mt-2" />
      <BottomSection>
        {restArticles.slice(0, 3).map((article, i) => (
          <Fragment key={i}>
            <main>
              {article.editorial && article.slug ? (
                <>
                  <figure>
                    <Image
                      src={article.content.image.desktop_image_path}
                      alt={article.title}
                      loading="lazy"
                    />
                  </figure>
                  <Link
                    href={`/${article.editorial.slug}/${article.slug}`}
                    hover="hover:opacity-60"
                  >
                    <div>
                      <div>
                        <h3>{article.title}</h3>
                      </div>
                    </div>
                  </Link>
                  <p>{article.subtitle}</p>
                  <small>Por: {article.author}</small>
                </>
              ) : (
                <p>Article anchor missing</p>
              )}
            </main>
          </Fragment>
        ))}
      </BottomSection>
    </Container>
  )
}
