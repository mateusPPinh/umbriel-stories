import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { type PropsWithChildren } from 'react'
import isPropValid from '@emotion/is-prop-valid'

const spacingSize = 8
const theme = {
  breakpoints: {
    down: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
      return `@media (max-width: ${theme.breakpoints.values[size]}px)`
    },
    up: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
      return `@media (min-width: ${theme.breakpoints.values[size]}px)`
    },
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    neutral50: '#F7F8F8',
    neutral100: '#E6E6E9',
    neutral200: '#D4D5D9',
    neutral300: '#BFC1C7',
    neutral400: '#ADB0B7',
    neutral500: '#8C8F9A',
    neutral600: '#666A79',
    neutral700: '#404557',
    neutral800: '#33394C',
    neutral900: '#1A2035',
    primary50: '#EBEFFF',
    primary100: '#D6E0FF',
    primary200: '#A8BDFF',
    primary300: '#809DFF',
    primary400: '#527AFF',
    primary500: '#295BFF',
    primary600: '#0037EB',
    primary700: '#002AB3',
    primary800: '#001B75',
    primary900: '#000E3D',
    primary950: '#00071F',
    secondary50: '#FFF0EB',
    secondary100: '#FFE1D6',
    secondary200: '#FFBFA8',
    secondary300: '#FFA180',
    secondary400: '#FF8052',
    secondary500: '#FF6229',
    secondary600: '#EB3E00',
    secondary700: '#B33000',
    positive50: '#E6FAEE',
    positive100: '#D0F5E1',
    positive200: '#A2ECC2',
    positive300: '#73E2A4',
    positive400: '#45D985',
    positive500: '#27BE69',
    positive600: '#1F9854',
    positive700: '#17723F',
    negative50: '#FEECEE',
    negative100: '#FCD9DE',
    negative200: '#FAB3BD',
    negative300: '#F78C9C',
    negative400: '#F5667A',
    negative500: '#F2415A',
    negative600: '#E5102E',
    negative700: '#AC0C22',
    negative800: '#730817',
    warning50: '#FFF8E5',
    warning100: '#FFF3D1',
    warning200: '#FFE59E',
    warning300: '#FFD970',
    warning400: '#FFCB3D',
    warning500: '#FFBF0F',
    warning600: '#D69D00',
    info50: '#EBEFFF',
    info100: '#D6E0FF',
    info200: '#A8BDFF',
    info300: '#809DFF',
    info400: '#527AFF',
    info500: '#295BFF',
    info600: '#0037EB',
    info700: '#002AB3',
    info800: '#001B75',
    info900: '#000E3D',
    info950: '#00071F',
    transparent: 'transparent'
  },
  fonts: { // compatibilidade com components
    fontPrimary: 'Montserrat',
    fontSecondary: 'Roboto'
    // thin: 100,
    // light: 300,
    // regular: 400,
    // medium: 500,
    // bold: 600
  },
  spacing: function () {
    const results = []
    for (let i = 0; i < arguments.length; i++) {
      results.push(arguments[i] * spacingSize + 'px')
    }
    return results.join(' ')
  }
}
export default function CustomStyles ({ children }: PropsWithChildren): any {
  return (
    <StyleSheetManager
      enableVendorPrefixes
      shouldForwardProp={(propName, elementToBeRendered) => {
        return typeof elementToBeRendered === 'string'
          ? isPropValid(propName)
          : true
      }}
        >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}
