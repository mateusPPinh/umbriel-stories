/* eslint-disable react/display-name */
import React from 'react'
import { processInlineStyles } from '../styles/cssUtils'
import { type AnchorType } from './types'

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorType>((props, ref) => {
  const { customCss, children, ...restProps } = props
  const inlineStyles = processInlineStyles(customCss)

  return (
    <a
      ref={ref}
      style={inlineStyles}
      {...restProps}
      className={props.className}
    >
      {children}
    </a>
  )
})

export default Anchor
