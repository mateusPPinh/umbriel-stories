import { type ReactNode } from 'react'

export interface LinkedinProps {
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
}

export interface LinkedinShareButtonProps {
  pageUrl?: string
  linkedinPath?: string
  linkedinProps?: LinkedinProps
  size?: string
  icon: ReactNode
  slug: string
  editorialSlug: string
  clientSiteAddressUrl?: string
  articleTitle?: string
  isLinkedinHovered: boolean
  onLinkedinMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  onLinkedinMouseLeave?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}
