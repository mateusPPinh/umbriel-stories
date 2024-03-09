import { type CSSInline } from '../styles/cssUtils'
import { type DefaultTheme } from 'styled-components'

export type TextProps<C extends React.ElementType> = {
  as?: C
  children: React.ReactNode
  css?: CSSInline
  color?: keyof DefaultTheme['colors']
} & React.ComponentPropsWithoutRef<C>
