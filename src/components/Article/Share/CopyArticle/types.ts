import { type ReactNode } from 'react'

export type CopyArticleCSSType = {
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
}

export type CopyArticleType = {
  copyIcon: ReactNode
  onCopy: () => void
  copyArticleProps: CopyArticleCSSType
  copyButtonChildren?: ReactNode
  isCopied?: boolean
}
