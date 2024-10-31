/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ReactElement } from 'react'
import { type IArticleWrapperTypes } from './types'
import ArticleBody from './Body'
import { PageArticleContainer, AuthorAndShareContainer } from './article.styles'
import Title from './Title'
import Subtitle from './Subtitle'
import Share from './Share'
import AuthorSection from './Author'
import { withTheme } from 'styled-components'

const Article = ({
  article,
  articleBodyWidth,
  author,
  shareProps,
  tags,
  titleProps,
  customCSS,
  subtitleProps,
  articleBodyCustomCss,
  shouldRenderAuthorAndShare,
  articleBodyMaxWidth,
  authorAndShareContainerBottom,
  authorAndShareContainerTop,
  authorContainerMaxWidth,
  authorContainerWidth,
}: IArticleWrapperTypes): ReactElement => {
  const {
    containerProps,
    whatsappIcon,
    whatsappPath,
    whatsappProps,
    slug,
    editorialSlug,
    twitterIcon,
    twitterPath,
    twitterProps,
    linkedinIcon,
    linkedinPath,
    linkedinProps,
    shouldRenderOnTopOnly,
    shouldRenderOnBottomOnly,
    shouldRenderTopBottom,
    clientSiteAddressUrl,
    articleTitle,
    clientTwitterHandle,
  } = shareProps

  const shareComponent = (
    <Share
      whatsappIcon={whatsappIcon}
      whatsappPath={whatsappPath}
      containerProps={containerProps}
      whatsappProps={whatsappProps}
      slug={slug}
      editorialSlug={editorialSlug}
      twitterIcon={twitterIcon}
      twitterPath={twitterPath}
      twitterProps={twitterProps}
      linkedinIcon={linkedinIcon}
      linkedinPath={linkedinPath}
      linkedinProps={linkedinProps}
      clientSiteAddressUrl={clientSiteAddressUrl}
      articleTitle={articleTitle}
      clientTwitterHandle={clientTwitterHandle}
    />
  )

  const authorComponent = (
    <AuthorSection
      borderWidth={author?.borderWidth ?? ''}
      alignItems={author?.alignItems ?? ''}
      authorPageLink={author?.authorPageLink ?? ''}
      authorThumb={author?.authorThumb ?? ''}
      borderColor={author?.borderColor}
      borderRadius={author?.borderRadius ?? ''}
      color={author?.color}
      email={author?.email ?? ''}
      flexDirection={author?.flexDirection ?? ''}
      fontFamily={author?.fontFamily}
      fontSize={author?.fontSize}
      height={author?.height ?? ''}
      justifyContent={author?.justifyContent ?? ''}
      lineHeight={author?.lineHeight ?? ''}
      maxWidth={author?.maxWidth ?? ''}
      mb={author?.mb ?? ''}
      ml={author?.ml ?? ''}
      mr={author?.mr ?? ''}
      mt={author?.mt ?? ''}
      value={author?.value ?? ''}
      width={author?.width ?? ''}
      imageWidth={author?.imageWidth}
      imageHeight={author?.imageHeight}
      authorNameMarginLeft={author?.authorNameMarginLeft}
    />
  )

  const renderAuthorAndShareSameSection = (): ReactElement => {
    return (
      <>
        {shouldRenderAuthorAndShare && shouldRenderOnTopOnly ? (
          <AuthorAndShareContainer
            $authorAndShareContainerBottom={authorAndShareContainerBottom}
            $authorAndShareContainerTop={authorAndShareContainerTop}
            $authorContainerWidth={authorContainerWidth}
            $authorContainerMaxWidth={authorContainerMaxWidth}
          >
            {authorComponent}
            {shareComponent}
          </AuthorAndShareContainer>
        ) : (
          <></>
        )}
      </>
    )
  }

  if (!titleProps || !subtitleProps) {
    throw new Error('Props not found')
  }

  return (
    <PageArticleContainer
      $articleBodyWidth={articleBodyWidth}
      $articleBodyMaxWidth={articleBodyMaxWidth ?? ''}
      className={customCSS ?? ''}
    >
      <Title {...titleProps} title={article.title} />
      <Subtitle {...subtitleProps} subtitle={article.subtitle ?? ''} />
      {shouldRenderAuthorAndShare && renderAuthorAndShareSameSection()}

      {!shouldRenderAuthorAndShare &&
        (shouldRenderOnTopOnly ?? shouldRenderTopBottom) &&
        shareComponent}

      <ArticleBody
        blocks={article.blocks}
        articleBodyCustomCss={articleBodyCustomCss ?? ''}
      />

      {!shouldRenderAuthorAndShare &&
        (shouldRenderOnBottomOnly ?? shouldRenderTopBottom) &&
        shareComponent}
    </PageArticleContainer>
  )
}

export default withTheme(Article)
