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
  ArticleRowBorderTop,
} from './styles'
import ShouldRenderXBorderBottomDivider from '../../../conditions/ShouldRenderXBorderBottomDivider'
import ShouldRenderYBorderRightDivider from '../../../conditions/ShouldRenderYBorderRightDivider'
import Link from '../../../../Link'

import { type BlockData, type Article } from '../../../PageBlock.types'

interface T3070VariationProps {
  articles: Article[]
  articlesPerRow?: number
  isDarkMode?: boolean | null
  columnCSSProps?: {
    titleColor: string
    subtitleColor: string
  }
  rowColumnCSSProps?: {
    titleColor: string
  }
  borderRightColor?: string
  rowColumnBorderTopColor?: string
  borderBottomColor?: string
}

// eslint-disable-next-line react/display-name
const ArticleCard = memo(
  ({
    article,
    columnCSSProps,
    isDarkMode,
  }: {
    article: Article | undefined
    columnCSSProps: T3070VariationProps['columnCSSProps']
    isDarkMode?: boolean | null
  }) => {
    if (!article?.editorial || !article?.slug) {
      console.error('Article editorial or slug is missing', article)
      return null
    }

    return (
      <ArticlePreview
        className="articlePreview"
        columnCSSProps={{
          $titleColor: columnCSSProps?.titleColor ?? '#000',
          $subtitleColor: columnCSSProps?.subtitleColor ?? '#666',
        }}
        isDarkMode={isDarkMode}
      >
        <Link
          href={`/${article.editorial.slug}/${article.slug}`}
          hover="hover:opacity-60"
        >
          <h2 className="articleTitle font-primary">{article.title}</h2>
          <p className="articleSubtitle font-primary">{article.subtitle}</p>
        </Link>
      </ArticlePreview>
    )
  }
)

interface T3070VariationProps {
  articles: Article[]
}

export default function T3070Variation({
  articles,
  articlesLayout,
  articlesPerRow,
  isDarkMode,
  columnCSSProps,
  rowColumnCSSProps,
  rowColumnBorderTopColor,
}: T3070VariationProps & {
  articlesLayout: BlockData['articlesLayout']
}): ReactElement {
  const { column, sideColumn, articleRows } = articlesLayout

  const [firstArticle, secondArticle, thirdArticle] = column.map((slug) =>
    articles.find((article) => article.slug === slug)
  )
  const sideColumnArticle = articles.find(
    (article) => article.slug === sideColumn
  )
  const rowArticles = articleRows.map((slug) =>
    articles.find((article) => article.slug === slug)
  )

  const chunkArticles = (articles: Article[], size: number) => {
    const result: Article[][] = []
    for (let i = 0; i < articles.length; i += size) {
      result.push(articles?.slice(i, i + size))
    }
    return result
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const groupedArticles = chunkArticles(rowArticles ?? 0, articlesPerRow || 3)

  return (
    <Container>
      <MainContent>
        <Column>
          <ArticleCard
            isDarkMode={isDarkMode}
            article={firstArticle}
            columnCSSProps={columnCSSProps}
          />
          <Divider />
          <ArticleCard
            isDarkMode={isDarkMode}
            columnCSSProps={columnCSSProps}
            article={secondArticle}
          />
          <Divider />
          <ArticleCard
            isDarkMode={isDarkMode}
            columnCSSProps={columnCSSProps}
            article={thirdArticle}
          />
        </Column>
        <SideColumn>
          <Image
            src={sideColumnArticle?.content.image.desktop_image_path}
            alt={sideColumnArticle?.title}
            loading="lazy"
            decoding="async"
          />
        </SideColumn>
      </MainContent>

      {/* <div className="border-t bg-gray-300" /> */}
      <ArticleRowBorderTop
        $isDarkMode={isDarkMode}
        $rowColumnBorderTopColor={rowColumnBorderTopColor}
      />
      {groupedArticles.map((group, index) => (
        <ArticleRowContainer
          key={index}
          articlesPerRow={articlesPerRow != null || 3}
        >
          {group.map((article, i) => (
            <Fragment key={i}>
              <ArticleRow
                $rowColumnCSSProps={rowColumnCSSProps}
                articlesPerRow={articlesPerRow ?? 0}
              >
                <Link
                  className="flex flex-row items-center space-x-2"
                  href={`/${article.editorial.slug}/${article.slug}`}
                  hover="hover:opacity-60"
                >
                  <img
                    src={article.content.image.desktop_image_path}
                    className="object-cover w-full h-full max-w-[146px] rounded-[6px]"
                  />
                  <h2 className="font-primary self-start">{article.title}</h2>
                </Link>
              </ArticleRow>
            </Fragment>
          ))}
        </ArticleRowContainer>
      ))}
      <ShouldRenderXBorderBottomDivider customStyles="borderXCustomClass" />
      <ShouldRenderYBorderRightDivider
        customStyles="borderYCustomClass"
        borderYRightPadding="10px"
      />
    </Container>
  )
}
