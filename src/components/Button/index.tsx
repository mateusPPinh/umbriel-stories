import { type ReactElement } from 'react'
import { Container } from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'underline'
  className?: string
}

export default function Button ({ children, variant, className, ...rest }: ButtonProps): ReactElement {
  if ((children === null) || (variant === null)) {
    throw new Error('Hey, it looks like you forgot to select important properties for your button!')
  }
  return (
    <Container variant={variant} className={className} {...rest}>
      {children}
    </Container>
  )
}
