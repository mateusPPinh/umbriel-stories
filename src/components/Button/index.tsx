import { type ReactElement } from 'react'
import { Container } from './styles'
import plusIcon from '../../../public/plus-icon.svg'
import { type ButtonProps } from './types'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Button({
  children,
  variant,
  className,
  isFullWidth,
  disabled,
  isLoading,
  ...rest
}: ButtonProps): ReactElement {
  if (children === null || variant === null) {
    throw new Error(
      'Hey, it looks like you forgot to select important properties for your button!'
    )
  }

  return (
    <Container
      variant={variant}
      className={className}
      isFullWidth={isFullWidth}
      disabled={disabled}
      isLoading={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ClipLoader
          color="currentColor"
          loading={isLoading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="w-full"
        />
      ) : variant === 'rounded' ? (
        <>
          <img src={plusIcon} alt="plus icon" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Container>
  )
}
