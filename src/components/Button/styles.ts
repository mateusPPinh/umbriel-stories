import styled, { css } from 'styled-components'

interface CSSProps {
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'underline'
    | 'rounded'
    | 'transparent'
  isFullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
}

const paddingStyles = css`
  padding: 16px 1rem;
  border-radius: 4px;
`

const lightPaddingStyles = css`
  padding: 1rem 8px;
  border-radius: 5px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray200};
`

const variantStyles = css<CSSProps>`
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.lightBlue.lightBlue100};
          color: ${theme.colors.lightBlue.lightBlue900};
          ${paddingStyles}
        `
      case 'secondary':
        return css`
          background-color: ${theme.colors.lightBlue.lightBlue800};
          color: white;
          ${paddingStyles}
        `
      case 'success':
        return css`
          background-color: #28a745;
          color: white;
          ${paddingStyles}
        `
      case 'warning':
        return css`
          background-color: #ffc107;
          color: black;
          ${paddingStyles}
        `
      case 'danger':
        return css`
          background-color: #dc3545;
          color: white;
          ${paddingStyles}
        `
      case 'info':
        return css`
          background-color: #17a2b8;
          color: white;
          ${paddingStyles}
        `
      case 'light':
        return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.gray900};
          ${lightPaddingStyles}
        `
      case 'dark':
        return css`
          background-color: #343a40;
          color: white;
          ${paddingStyles}
        `
      case 'underline':
        return css`
          background-color: transparent;
          color: ${theme.colors.lightBlue.lightBlue900};
          text-decoration: underline;
        `
      case 'transparent':
        return css`
          background-color: transparent;
          text-decoration: none;
        `
      case 'rounded':
        return css`
          background-color: ${theme.colors.lightBlue.lightBlue900};
          width: 80px;
          height: 80px;
          border-radius: 50%;
          color: ${theme.colors.white};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          & svg {
            width: 16px;
            height: 16px;
          }

          & span {
            font-size: 12px;
            line-height: 120%;
            margin-top: 5px;
            font-family: ${theme.fonts.fontPrimary};
            font-weight: lighter;
          }
        `
      default:
        return css``
    }
  }}
`

const Container = styled.button<CSSProps>`
  ${variantStyles};
  font-family: 'Rubik Variable';
  line-height: 110%;
  font-weight: 500;
  font-size: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        background-color: transparent;
        cursor: not-allowed;
        color: ${theme.colors.white};
        opacity: 0.5;

        &:hover {
          opacity: none;
          transition: none;
        }
      `
    }
  }}

  ${({ isFullWidth }) => {
    if (isFullWidth === true) {
      return `
        width: 100vw;
      `
    }
  }}
`

export { Container }
