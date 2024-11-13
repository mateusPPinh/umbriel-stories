import { type ReactNode } from 'react'
import { type FacebookProps } from './Facebook/types'
import { type TwitterProps } from './Twitter/types'
import { type WhatsAppProps } from './Whatsapp/types'
import { type LinkedinProps } from './Linkedin/types'
import { type CopyArticleType } from './CopyArticle/types'

export interface ContainerProps {
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
  width?: string
  maxWidth?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
}

export interface ShareProps {
  containerProps?: ContainerProps
  pageUrl?: string
  size?: string
  facebookPath?: string
  facebookProps?: FacebookProps
  fbappid?: string
  twitterPath?: string
  twitterProps?: TwitterProps
  whatsappPath?: string
  whatsappProps?: WhatsAppProps
  whatsappIcon?: ReactNode
  slug: string
  editorialSlug: string
  twitterIcon?: ReactNode
  linkedinPath?: string
  linkedinProps?: LinkedinProps
  linkedinIcon?: ReactNode
  shouldRenderOnTopOnly?: boolean
  shouldRenderOnBottomOnly?: boolean
  shouldRenderTopBottom?: boolean
  clientSiteAddressUrl?: string
  articleTitle?: string
  clientTwitterHandle?: string
  copyArticleProps?: Pick<CopyArticleType, 'copyArticleProps'>
  copyIcon?: ReactNode
  onCopy: () => void
  copyButtonChildren?: ReactNode
  isCopied?: boolean
  isHovered: boolean
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  isLinkedinHovered: boolean
  onLinkedinMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  onLinkedinMouseLeave?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  isWhatsappHovered: boolean
  onWhatsappMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  onWhatsappMouseLeave?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}
