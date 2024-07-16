import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blueDark: string
      white: string
      background1: string
      background2: string
      background3: string
      background4: string
      background5: string
      transparent: string
      gray50: string
      gray100: string
      gray200: string
      gray500: string
      gray800: string
      gray900: string
      violet: {
        violet50: string
        violet100: string
        violet200: string
        violet300: string
        violet400: string
        violet500: string
        violet600: string
        violet700: string
        violet800: string
        violet900: string
      }
    }
    fonts: {
      fontPrimary: string
      fontSecondary: string
      fontThird: string
      heading: string
      heading2: string
      mvpFont: string
    }
  }
}
