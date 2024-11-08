type FontTokens =
  | 'fontPrimary'
  | 'fontSecondary'
  | 'fontThird'
  | 'heading'
  | 'heading2'
  | 'mvpFont'
  | 'dmSans'

type ColorTokensType = {
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
  red50: string
  red100: string
  red200: string
  red300: string
  red400: string
  red500: string
  red600: string
  red700: string
  red800: string
  red900: string
  red1000: string
  violet50: string
  violet100: string
  violet200: string
  violet300: string
  violet400: string
  violet500: string
  violet600: string
  violet700: string
  violet800: string
  violeto900: string
  blue50: string
  blue100: string
  blue200: string
  blue300: string
  blue400: string
  blue500: string
  blue600: string
  blue700: string
  blue800: string
  blue900: string
  lightBlue50: string
  lightBlue100: string
  lightBlue200: string
  lightBlue300: string
  lightBlue400: string
  lightBlue500: string
  lightBlue600: string
  lightBlue700: string
  lightBlue800: string
  lightBlue900: string
}

type QuerieTokens = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Fonts = {
  [key in FontTokens]: string
}

export type Colors = ColorTokensType

export type Queries = {
  [key in QuerieTokens]: string
}
