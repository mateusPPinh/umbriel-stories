import { type BoxProps } from './types'
import { processInlineStyles } from '../styles/cssUtils'
import React from 'react'
import { useTheme } from 'styled-components'

function Box<C extends React.ElementType = 'div'> ({
  as,
  children,
  css = {},
  noWrap = false,
  ...props
}: BoxProps<C>): React.ReactElement {
  if (noWrap) {
    return <React.Fragment>{children}</React.Fragment>
  }
  const theme = useTheme()
  const Component = as ?? 'div'
  const inlineStyles = processInlineStyles(css, theme)

  return (
    <Component style={inlineStyles} {...props}>
      {children}
    </Component>
  )
}

export default Box
