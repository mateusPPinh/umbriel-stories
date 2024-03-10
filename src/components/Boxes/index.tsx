import { type BoxProps } from './types'
import { processInlineStyles } from '../styles/cssUtils'

export default function Box<C extends React.ElementType = 'div'>
({
  as,
  children,
  css = {},
  ...props
}: BoxProps<C>): React.ReactElement {
  const Component = as || 'div'

  const inlineStyles = processInlineStyles(css)

  return (
    <Component style={inlineStyles} {...props}>
      {children}
    </Component>
  )
}
