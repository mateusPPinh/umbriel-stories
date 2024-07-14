export interface Article {
  id: string
  title: string
  subtitle?: string
  author?: string
  email?: string
  content: {
    image: {
      desktop_image_path: string
      image_mobile_path: string
    }
  }
  slug: string
  schedulePublication?: string | null
  articleBody: string
  status: string
  isAward: boolean
  metadata?: any
  pageBgColor: string
  articleLayoutStruct?: any
  created_at: string
  updated_at: string
  editorial: {
    id: string
    title: string
    description: string
    slug: string
  }
}

export interface Template5050Props {
  descriptions: string[]
  headingsProps?: {
    fontSize: string | number
    fontWeight: string | number
    transform: string
  }
}

export interface BlockConfig {
  layout: string
  columns: number[]
}

export interface BlockData {
  blockType: string
  blockPosition: string
  layout: string
  template: string
  articles: Article[]
  config: BlockConfig
  template50?: Template5050Props
}

export interface PageBlockProps {
  blocksData: BlockData[]
}
