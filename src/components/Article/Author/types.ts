import { type theme } from '../../../styles/examples/midia.theme'

export interface AuthorProps {
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
