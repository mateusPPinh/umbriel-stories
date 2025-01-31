export interface BlockConfig {
  layout: string
  columns: number[]
}

export interface Article {
  id: string
  title: string
  subtitle: string
  author: string | null
  email: string | null
  content: {
    image: {
      desktop_image_path: string
      image_mobile_path: string
    }
  }
  slug: string
  schedulePublication: string | null
  articleBody: string
  status: string
  isAward: boolean
  metadata: any
  pageBgColor: string
  articleLayoutStruct: any
  created_at: string
  updated_at: string
  editorial: {
    id: string
    title: string
    description: string
    slug: string
  }
  links?: Array<{
    title: string
    url: string
  }>
  articleEstimatedReadTime?: string
  isArticleLive?: boolean
}

export interface BlockData {
  blockType: string
  blockPosition: string
  blocksData: {
    centerMiddle: {
      articles: Article[]
    }
    components: any[]
  }
  pageId: string
  config: BlockConfig
  template50?: {
    descriptions?: string[]
    headingsProps?: {
      fontSize: string | number
      fontWeight: string | number
      transform: string
    }
  }
  blockTitle?: string
  template?: string
  articleId?: string | null
  id?: string
  created_at?: string
  updated_at?: string
  templateSlot100FeaturedRelatedProps?: {
    blockSubject: string
    bgColor: string
    blockSubjectColor: string
    articleTitleColor: string
    blockBorderRadius: string
  }
  editorial?: {
    id: string
    title: string
    description: string
    slug: string
  }
  templateSeventyCarouselProps?: {
    shouldRenderBorderBottom: boolean
  }
  articlesPerRow?: number
  articlesLayout: {
    column: string[]
    sideColumn: string
    articleRows: string[]
    rows?: Array<{ slugs: string[] }>
    carouselSlugs?: string[]
    videoUrl?: string
    bottomBlocksSlugs?: string[]
    poster?: string
    isYoutube?: boolean
  }
}

export interface PageBlockProps {
  blocksData: BlockData[]
  className?: string
  customStyles?: React.CSSProperties
  loading?: boolean | undefined
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
    padding?: string
    paddingBottom?: string
    paddingTop?: string
    width?: string
    maxWidth?: string
    height?: string
    maxHeight?: string
    tailwindClasses?: string
    mr?: string
    ml?: string
    mt?: string
    mb?: string
    radius?: string
    custom3070ContainerClassname?: string
  }
  articleRowContainerProps?: {
    direction: string
    bgColor: string
  }
  articleRowCustomCss?: string
  customGrid5050Style?: string
  customGrid505ArticleContainerStyle?: string
  customTemplateSeventyThirtyWithCarouselSyles?: {
    customContainerStyle: string
    customTextOverlayStyles: string
    customCarouselControllsStyle: string
    customArticleContainerStyles: string
    customBottomBlockStyles: string
    customRightSectionStyles: string
  }
}
