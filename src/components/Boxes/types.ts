import { type CSSInline } from '../styles/cssUtils'

export type BoxProps<C extends React.ElementType> = {
  as?: C
  children: React.ReactNode
  css?: CSSInline
} & React.ComponentPropsWithoutRef<C>
