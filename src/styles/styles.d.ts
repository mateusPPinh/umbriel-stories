import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      down: (size: 'sm' | 'md' | 'lg' | 'xl') => string
      up: (size: 'sm' | 'md' | 'lg' | 'xl') => string
      values: {
        sm: number
        md: number
        lg: number
        xl: number
      }
    }
    colors: {
      blueDark: string
      white: string
      background1: string
      background2: string
      background3: string
      background4: string
      background5: string
      transparent: string
    }
    fonts: {
      fontPrimary: string
      fontSecondary: string
      fontThird: string
      heading: string
    }
    spacing: (...args: number[]) => string
  }
}
