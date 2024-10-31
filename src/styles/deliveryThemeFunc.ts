/* eslint-disable @typescript-eslint/ban-types */
import merge from 'lodash/merge'
import { theme as defaultTheme } from './examples/midia.theme'
import { type Colors, type Fonts, type Queries } from './tokens'

export interface ThemeProps {
  colors: Colors
  fonts: Fonts
  queries: Queries
}

export const DeliveryThemeFunc = (data: ThemeProps | Object): any => {
  return merge(defaultTheme, data)
}

export const theme = DeliveryThemeFunc({})
