/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type React from 'react'
import { type DefaultTheme } from 'styled-components'

export type CSSInline = {
  alignX?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  alignY?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  align?: ''
  bgColor?: keyof DefaultTheme['colors'] | 'transparent'
  color?: keyof DefaultTheme['colors'] | 'transparent'
  mb?: string | number
  mx?: string | number
  mt?: string | number
  slot_left?: React.ReactNode
  slot_right?: React.ReactNode
  py?: string | number
  boxShadow?: string
  maxWidth?: string
  width_container?: [string, string]
} & React.CSSProperties

export const processInlineStyles = (
  css: CSSInline = {},
  theme?: DefaultTheme
): React.CSSProperties => {
  console.log(css, 'css')
  console.log(theme, 'theme')
  const inlineStyles: React.CSSProperties = {
    ...css,
    marginBottom: css.mb,
    marginLeft: css.mx,
    marginRight: css.mx,
    marginTop: css.mt,
    paddingTop: css.py,
    paddingBottom: css.py,
    boxShadow: css.boxShadow,
    maxWidth: css.maxWidth,
    color: css.color ? theme?.colors[css.color] ?? css.color : undefined,
    backgroundColor: css.bgColor
      ? theme?.colors[css.bgColor] ?? css.bgColor
      : undefined
  }

  if (css.alignX ?? css.alignY) {
    inlineStyles.display = 'flex'
    if (css.alignX) inlineStyles.justifyContent = css.alignX
    if (css.alignY) inlineStyles.alignItems = css.alignY
  }

  return inlineStyles
}
