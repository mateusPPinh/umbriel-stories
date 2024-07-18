import 'styled-components'
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blueDark: '#142634'
      white: '#FFFFFF'
      background1: '#F1EDE2'
      background2: '#F2EBDA'
      background3: '#F1F2F2'
      background4: '#FFF7FF'
      background5: '#E1EDF2'
      transparent: 'transparent'
      gray50: '#FAFAFA'
      gray100: '#F4F4F5'
      gray200: '#E4E4E7'
      gray500: '#71717A'
      gray800: '#27272A'
      gray900: '#18181B'
      violet: {
        violet50: '#F5F3FF'
        violet100: '#EDE9FE'
        violet200: '#C4B5FD'
        violet300: '#C4B5FD'
        violet400: '#A78BFA'
        violet500: '#8B5CF6'
        violet600: '#7C3AED'
        violet700: '#6D28D9'
        violet800: '#5B21B6'
        violet900: '#4C1D95'
      }
    }
    fonts: {
      fontPrimary: 'Noto Sans Variable'
      fontSecondary: 'Roboto'
      fontThird: 'Poppins'
      heading: 'Rubik Variable'
      heading2: 'Inter Variable'
      mvpFont: 'Lora Variable'
    }
  }
}
