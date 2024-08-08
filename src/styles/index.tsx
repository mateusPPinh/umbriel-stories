import '@fontsource-variable/roboto-condensed'
import '@fontsource/roboto'
import '@fontsource-variable/noto-sans'
import '@fontsource-variable/rubik'
import '@fontsource-variable/lora'
import '@fontsource-variable/inter'
import '@fontsource-variable/dm-sans'

import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { type PropsWithChildren } from 'react'
import isPropValid from '@emotion/is-prop-valid'

const theme = {
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
      violet900: '#4C1D95',
    },
    blue: {
      blue50: '#EFF6FF',
      blue100: '#DBEAFE',
      blue200: '#BFDBFE',
      blue300: '#93C5FD',
      blue400: '#60A5FA',
      blue500: '#3B82F6',
      blue600: '#2563EB',
      blue700: '#1D4ED8',
      blue800: '#1E40AF',
      blue900: '#1E3A8A',
    },
    lightBlue: {
      lightBlue50: '#F0F9FF',
      lightBlue100: '#E0F2FE',
      lightBlue200: '#BAE6FD',
      lightBlue300: '#7DD3FC',
      lightBlue400: '#38BDF8',
      lightBlue500: '#0EA5E9',
      lightBlue600: '#0284C7',
      lightBlue700: '#0369A1',
      lightBlue800: '#075985',
      lightBlue900: '#0C4A6E',
    },
    red: {
      red50: '#FEF2F2',
      red100: '#FEE2E2',
      red200: '#FECACA',
      red300: '#FCA5A5',
      red400: '#F87171',
      red500: '#EF4444',
      red600: '#DC2626',
      red700: '#B91C1C',
      red800: '#991B1B',
      red900: '#7F1D1D',
    },
  },
  fonts: {
    fontPrimary: 'Noto Sans Variable',
    fontSecondary: 'Roboto',
    fontThird: 'Poppins',
    heading: 'Rubik Variable',
    heading2: 'Inter Variable',
    mvpFont: 'Lora Variable',
    dmSans: 'DM Sans Variable',
  },
}

export default function CustomStyles({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <StyleSheetManager
      enableVendorPrefixes
      shouldForwardProp={(propName, elementToBeRendered) =>
        typeof elementToBeRendered === 'string' ? isPropValid(propName) : true
      }
    >
      {/* @ts-expect-error */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  )
}
