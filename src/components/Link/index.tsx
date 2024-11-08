import React, {
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  target?: string
  hover?: string
  shouldDisableClick?: boolean
}

const Link = ({
  href,
  children,
  target,
  hover,
  shouldDisableClick,
  ...rest
}: LinkProps): ReactElement => {
  return (
    <a
      href={href}
      target={target}
      className={`transition duration-300 ${hover}`}
      style={{ pointerEvents: shouldDisableClick ? 'none' : 'auto' }}
      {...rest}
    >
      {children}
    </a>
  )
}

export default Link
