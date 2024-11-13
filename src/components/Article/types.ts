import { type theme } from '../../styles/index'
import { type ShareProps } from './Share/types'

enum ArticleStatus {
  NotPublished = 'notPublished',
  Published = 'published',
  Draft = 'draft',
}

interface Props {
  title: string
  subtitle?: string
  author: string
  email?: string
  social_networks?: string
  content: {
    image: {
      desktop_image_path: string
      imagem_mobile_path: string
    }
  }
  articleBody: string
  slug: string
  user_id?: any
  schedule_publication?: Date | undefined | string
  id?: string
  status: typeof ArticleStatus
  editorialId: string
  static_page_id?: string
  isAward?: boolean
  metadata?: any
  pageBgColor?: any
  editorialName?: string
  turnOff?: boolean
  links?: Array<{
    title: string
    url: string
  }>
  articleEstimatedReadTime?: string
  isArticleLive?: boolean
  editorialObject?: {
    id: string
    title: string
    description: string
    slug: string
  }
  blocks?: Array<{
    html: string
    id: string
    type: string
  }>
  authorData?: {
    color: string
    email: string
    fontFamily: string
    fontSize: string
    lineHeight: string
    value: string
  }
  shareData?: {
    pageUrl: string
    facebookId: string
    facebookPath: string
    twitterPath: string
    whatsappPath: string
    linkedinPath: string
  }
  articleBodyImages?: Array<{
    caption?: string
    contentId?: string
    url: string
  }>
}

export interface IArticleWrapperTypes {
  article: Props
  articleBodyWidth: string | null
  articleBodyMaxWidth?: string | null
  authorAndShareContainerTop?: string
  authorAndShareContainerBottom?: string
  articleBodyCustomCss?: string
  shouldRenderOnTopOnly?: boolean
  shouldRenderTopBottom?: boolean
  shouldRenderOnBottomOnly?: boolean
  shouldRenderAuthorAndShare?: boolean
  authorContainerWidth?: string
  shouldHiddeTitleAndSubtitle?: boolean
  authorContainerMaxWidth?: string
  customCSS?: string
  author?: {
    value?: string
    email?: string
    color?: keyof typeof theme.colors
    fontFamily?: keyof typeof theme.fonts
    fontSize?: string
    lineHeight?: string
    width?: string
    maxWidth?: string
    mt?: number | string
    mr?: number | string
    mb?: number | string
    ml?: number | string
    flexDirection?: string
    justifyContent?: string
    alignItems?: string
    borderRadius?: string
    height?: string
    borderColor?: keyof typeof theme.colors
    borderWidth: string
    authorThumb?: string
    authorPageLink?: string
    imageWidth?: string
    imageHeight?: string
    authorNameMarginLeft?: string
    fontWeight?: string
    showPublicationDate?: boolean
    publicationDate?: any
    shouldDisableAuthorNameClick?: boolean
  }
  paragraphProps: {
    fontFamily: string
    fontSize: string
    fontWeight: string
    lineHeight: string
  }
  shareProps: ShareProps
  tags?: {
    borderColor: string
    color: string
    tagType: string
  }
  titleProps?: {
    containerWidth: string
    marginBottom: string
    fontFamily: keyof typeof theme.fonts
    fontWeight: string
    lineHeight: string
    fontSize: string
    letterSpacing: string
    color: keyof typeof theme.colors
    customContainerCSS?: string
    customHeadingCSS?: string
    containerMaxWidth?: string
  }
  subtitleProps?: {
    containerWidth: string
    containerMaxWidth?: string
    marginBottom: string
    fontFamily: keyof typeof theme.fonts
    fontWeight: string
    lineHeight: string
    fontSize: string
    letterSpacing: string
    color: keyof typeof theme.colors
    customContainerCSS?: string
    customHeadingCSS?: string
  }
  clientSiteAddressUrl?: string
  articlesList?: Array<{
    thumb: string
    title: string
  }>
  articleParagraphBodyProps: {
    fontFamily?: keyof typeof theme.fonts
    fontSize?: string
    lineHeight?: string
    mt?: string
    mb?: string
    ml?: string
    mr?: string
    color: keyof typeof theme.colors
    fontWeight?: string
  }
  imgProps: {
    width?: string
    height?: string
    maxWidth?: string
    maxHeight?: string
    customAlt?: string
    borderRadius?: string
  }
  figcaptionProps: {
    fontSize?: string
    fontFamily?: keyof typeof theme.fonts
    color?: keyof typeof theme.colors
    linHeight?: string
    width?: string
    maxWidth?: string
    height?: string
    maxHeight?: string
    pt?: string
    pb?: string
    pr?: string
    pl?: string
    mt?: string
    mb?: string
    mr?: string
    ml?: string
    align?: string
  }
}

export interface AlignmentType {
  alignment: 'center' | 'left' | 'right' | 'flex-start' | 'flex-end'
}
