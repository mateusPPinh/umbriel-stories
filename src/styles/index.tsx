import '@fontsource-variable/roboto-condensed'
import '@fontsource/roboto'
import '@fontsource-variable/noto-sans'

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
    transparent: 'transparent'
  },
  fonts: {
    fontPrimary: 'Noto Sans Variable',
    fontSecondary: 'Roboto',
    fontThird: 'Poppins',
    heading: 'Rubik'
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
