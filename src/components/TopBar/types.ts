import { type ReactNode, type MouseEvent } from 'react'

export interface TopbarProps {
  topbarDescriptionChild: ReactNode
  variant: 'topbarArticle' | 'topbarDefault'
  topbarBgColor: string
  logo?: ReactNode
  centralContent?: ReactNode
  onLogoClick?: (event: MouseEvent<HTMLButtonElement>) => void
  items: Array<{
    label: string
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    hasIcon?: {
      isGobackIcon: boolean
      isNextIcon: boolean
    }
  }>
  className?: string
  isSticky?: boolean
}
