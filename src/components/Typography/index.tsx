import React from 'react'
import { type TextProps } from './types'
import { processInlineStyles } from '../styles/cssUtils'
import { useTheme } from 'styled-components'

function Text<C extends React.ElementType = 'span'> ({
  as,
  children,
  css = {},
  ...props
}: TextProps<C>): React.ReactElement {
  const theme = useTheme()
  const Component = as ?? 'span'

  const inlineStyles = processInlineStyles(css, theme)

  return (
    <Component style={inlineStyles} {...props}>
      {children}
    </Component>
  )
}

export { Text }
