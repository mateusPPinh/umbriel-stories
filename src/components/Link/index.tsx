import React, { type ReactElement, type ReactNode } from 'react'

interface LinkProps {
  href: string
  children: ReactNode
  target?: string
  hover?: string
}

const Link = ({ href, children, target, hover }: LinkProps): ReactElement => {
  return (
    <a href={href} target={target} className={`transition duration-300 ${hover}`}>
      {children}
    </a>
  )
}

export default Link
