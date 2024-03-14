import { type ReactNode, type ElementType } from 'react'

export interface TextHandlersProps {
  title?: string
  subtitle?: string
  color?: any // corrigir para usar o theme
  as?: ElementType
  font_family?: string
  font_size?: string | number
  line_height?: string | number
  transform?: string
  children: ReactNode
  childrenType?: 'title' | 'subtitle'
}
