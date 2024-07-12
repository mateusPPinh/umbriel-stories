import '@fontsource-variable/roboto-condensed'
import '@fontsource/roboto'
import '@fontsource-variable/noto-sans'
import '@fontsource-variable/rubik'

import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { type PropsWithChildren } from 'react'
import isPropValid from '@emotion/is-prop-valid'

const spacingSize = 8
const theme = {
  breakpoints: {
    down: (size: 'sm' | 'md' | 'lg' | 'xl') => {
      return `@media (max-width: ${theme.breakpoints.values[size]}px)`
    },
    up: (size: 'sm' | 'md' | 'lg' | 'xl') => {
      return `@media (min-width: ${theme.breakpoints.values[size]}px)`
    },
    values: {
      sm: 480,
      md: 768,
      lg: 976,
      xl: 1440
    }
  },
  colors: {
    blueDark: '#142634',
    white: '#FFFFFF',
    background1: '#F1EDE2',
    background2: '#F2EBDA',
    background3: '#F1F2F2',
    background4: '#FFF7FF',
    background5: '#E1EDF2',
    transparent: 'transparent',
    gray50: '#FAFAFA',
    gray100: '#F4F4F5',
    gray200: '#E4E4E7',
    gray500: '#71717A',
    gray800: '#27272A',
    gray900: '#18181B',
    violet: {
      violet50: '#F5F3FF',
      violet100: '#EDE9FE',
      violet200: '#C4B5FD',
      violet300: '#C4B5FD',
      violet400: '#A78BFA',
      violet500: '#8B5CF6',
      violet600: '#7C3AED',
      violet700: '#6D28D9',
      violet800: '#5B21B6',
      violet900: '#4C1D95'
    }
  },
  fonts: {
    fontPrimary: 'Noto Sans Variable',
    fontSecondary: 'Roboto',
    fontThird: 'Poppins',
    heading: 'Rubik Variable'
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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  )
}
