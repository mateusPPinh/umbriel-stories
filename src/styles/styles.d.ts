import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      down: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => string
      up: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => string
      values: {
        xs: number
        sm: number
        md: number
        lg: number
        xl: number
      }
    }
    colors: {
      white: string
      black: string
      neutral50: string
      neutral100: string
      neutral200: string
      neutral300: string
      neutral400: string
      neutral500: string
      neutral600: string
      neutral700: string
      neutral800: string
      neutral900: string
      primary50: string
      primary100: string
      primary200: string
      primary300: string
      primary400: string
      primary500: string
      primary600: string
      primary700: string
      primary800: string
      primary900: string
      primary950: string
      secondary50: string
      secondary100: string
      secondary200: string
      secondary300: string
      secondary400: string
      secondary500: string
      secondary600: string
      secondary700: string
      positive50: string
      positive100: string
      positive200: string
      positive300: string
      positive400: string
      positive500: string
      positive600: string
      positive700: string
      negative50: string
      negative100: string
      negative200: string
      negative300: string
      negative400: string
      negative500: string
      negative600: string
      negative700: string
      negative800: string
      warning50: string
      warning100: string
      warning200: string
      warning300: string
      warning400: string
      warning500: string
      warning600: string
      info50: string
      info100: string
      info200: string
      info300: string
      info400: string
      info500: string
      info600: string
      info700: string
      info800: string
      info900: string
      info950: string
      transparent: string
    }
    fonts: {
      fontPrimary: string
      fontSecondary: string
    }
    spacing: (...args: number[]) => string
  }
}
