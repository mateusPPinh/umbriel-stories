export interface ImageDataProps {
  id: number
  name: string
  caption?: string
  credits?: string
  description?: string
  url: string
  image_metadata?: any
  created_at: Date
}

export interface FontProps {
  fontSize: string | number
  fontWeight: string | number
  fontLineHeight: string | number
}

export interface GalleryProps {
  title?: string
  subtitle?: string
  titleFontProps?: FontProps
  subtitleFontProps?: FontProps
  useSlide?: boolean
  images: ImageDataProps[]
}
