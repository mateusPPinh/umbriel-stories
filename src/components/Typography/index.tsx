import React from 'react';
import { TextProps } from './types';
import { processInlineStyles } from '../styles/cssUtils';

function Text<C extends React.ElementType = 'span'>({
  as,
  children,
  css= {},
  ...props
}: TextProps<C>) {
  const Component = as || 'span';

  const inlineStyles = processInlineStyles(css)

  return <Component style={inlineStyles}  {...props}>{children}</Component>;
}

export {Text}