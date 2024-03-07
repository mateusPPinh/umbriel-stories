import { BoxProps } from "./types"
import { processInlineStyles } from "../styles/cssUtils";

export function Box<C extends React.ElementType = 'div'> 
({
  as, 
  children,
  css = {},
  ...props
}: BoxProps<C>) {
  const Component = as || 'div'

  const inlineStyles = processInlineStyles(css);

  return (
    <Component style={inlineStyles} {...props}>
      {children}
    </Component>
  )
}