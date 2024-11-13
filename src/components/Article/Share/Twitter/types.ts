import { type ReactNode } from 'react'

export interface TwitterProps {
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
}

export interface TwitterShareButtonProps {
  pageUrl?: string
  twitterPath?: string
  twitterProps?: TwitterProps
  size?: string
  icon: ReactNode
  slug: string
  editorialSlug: string
  clientSiteAddressUrl?: string
  articleTitle?: string
  clientTwitterHandle?: string
  isHovered: boolean
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}
