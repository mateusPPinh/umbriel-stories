import { type ReactNode } from 'react'

export interface WhatsAppProps {
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
}

export interface WhatsAppShareButtonProps {
  pageUrl: string
  size?: string
  whatsappProps?: WhatsAppProps
  icon: ReactNode
  slug: string
  editorialSlug: string
  clientSiteAddressUrl?: string
  articleTitle?: string
}
