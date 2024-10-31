type ColorTokensType =
  | 'blueDark'
  | 'white'
  | 'background1'
  | 'background2'
  | 'background3'
  | 'background4'
  | 'background5'
  | 'transparent'
  | 'gray50'
  | 'gray100'
  | 'gray200'
  | 'gray500'
  | 'gray800'
  | 'gray900'
  | 'violet'
  | 'blue'
  | 'lightBlue'
  | 'red'
  | 'lightBlue'

type FontTokens =
  | 'fontPrimary'
  | 'fontSecondary'
  | 'fontThird'
  | 'heading'
  | 'heading2'
  | 'mvpFont'
  | 'dmSans'

type QuerieTokens = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Fonts = {
  [key in FontTokens]: string
}

export type Colors = {
  [key in ColorTokensType]: string
}

export type Queries = {
  [key in QuerieTokens]: string
}
