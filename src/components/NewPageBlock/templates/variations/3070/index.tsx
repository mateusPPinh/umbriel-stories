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
  t3070ContainerProps?: {
    backgroundColor: string
    padding: string
    paddingBottom: string
    paddingTop: string
    width: string
    maxWidth: string
    height: string
    maxHeight: string
    tailwindClasses?: string // remover
    mr: string
    ml: string
    mt: string
    mb: string
    radius: string
    custom3070ContainerClassname: string
  }
  articlesPerRow?: number
  articleRowContainerProps?: {
    direction: string
    bgColor: string
  }
  articleRowCustomCss: string
}

// eslint-disable-next-line react/display-name
const ArticleCard = memo(
  ({
    article,
    $columnCSSProps,
    $isDarkMode,
  }: {
    article: Article | null
    $columnCSSProps: T3070VariationProps['columnCSSProps']
    $isDarkMode?: boolean | null
  }) => {
    if (!article?.editorial || !article?.slug) {
      console.error('Article editorial or slug is missing', article)
      return null
    }

    return (
      <ArticlePreview
        className="articlePreview"
        $columnCSSProps={{
          $titleColor: $columnCSSProps?.titleColor ?? '#000',
          $subtitleColor: $columnCSSProps?.subtitleColor ?? '#666',
        }}
        $isDarkMode={$isDarkMode}
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
  t3070ContainerProps,
  articleRowContainerProps,
  articleRowCustomCss,
}: T3070VariationProps & {
  articlesLayout: BlockData['articlesLayout']
}): ReactElement {
  const { column, sideColumn, articleRows } = articlesLayout

  const [firstArticle, secondArticle, thirdArticle] = column.map(
    (slug) => articles.find((article) => article.slug === slug) ?? null
  )

  const sideColumnArticle = articles.find(
    (article) => article.slug === sideColumn
  )

  const rowArticles = articleRows
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(Boolean) // Remove undefined ou null

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
  const groupedArticles = chunkArticles(rowArticles, articlesPerRow || 3)

  return (
    <Container
      className={t3070ContainerProps?.custom3070ContainerClassname}
      $t3070ContainerProps={{
        backgroundColor: t3070ContainerProps?.backgroundColor ?? '',
        height: t3070ContainerProps?.height ?? '',
        maxHeight: t3070ContainerProps?.maxHeight ?? '',
        maxWidth: t3070ContainerProps?.maxWidth ?? '',
        padding: t3070ContainerProps?.padding ?? '',
        paddingBottom: t3070ContainerProps?.paddingBottom ?? '',
        paddingTop: t3070ContainerProps?.paddingTop ?? '',
        width: t3070ContainerProps?.width ?? '',
        mb: t3070ContainerProps?.mb ?? '',
        mt: t3070ContainerProps?.mt ?? '',
        ml: t3070ContainerProps?.ml ?? '',
        mr: t3070ContainerProps?.mr ?? '',
        radius: t3070ContainerProps?.radius ?? '',
      }}
    >
      <MainContent>
        <Column>
          <ArticleCard
            $isDarkMode={isDarkMode}
            article={firstArticle}
            $columnCSSProps={columnCSSProps}
          />
          <Divider />
          <ArticleCard
            $isDarkMode={isDarkMode}
            $columnCSSProps={columnCSSProps}
            article={secondArticle}
          />
          <Divider />
          <ArticleCard
            $isDarkMode={isDarkMode}
            $columnCSSProps={columnCSSProps}
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
          $articlesPerRow={articlesPerRow != null || 3}
          $articleRowContainerProps={{
            bgColor: articleRowContainerProps?.bgColor,
          }}
        >
          {group.map((article, i) => (
            <Fragment key={i}>
              <ArticleRow
                className={articleRowCustomCss}
                $rowColumnCSSProps={rowColumnCSSProps}
                $articlesPerRow={articlesPerRow ?? 0}
              >
                <Link
                  className="flex flex-row items-center space-x-2"
                  href={`/${article.editorial.slug}/${article.slug}`}
                  hover="hover:opacity-60"
                >
                  <img
                    src={article.content.image.desktop_image_path}
                    className="object-cover w-full h-full max-w-[146px] rounded-[6px] max-h-[229.72px]"
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
