import { type CSSInline } from '../styles/cssUtils'

export type ImageProps = {
  desktop_image_path?: string
  mobile_image_path?: string
  customCss?: CSSInline
  className?: string
  alt: string
  fetchPriority?: 'high' | 'low' | 'auto' | undefined
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'style' | 'fetchPriority'
>
