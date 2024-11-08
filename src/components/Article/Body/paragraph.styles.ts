import styled, { css } from 'styled-components'
import { theme } from '../../../styles/examples/midia.theme'

export const BodyContainer = styled.div<{
  $fontFamily?: keyof typeof theme.fonts
  $fontSize?: string
  $lineHeight?: string
  $mt?: string
  $mb?: string
  $ml?: string
  $mr?: string
  $color: keyof typeof theme.colors
  $fontWeight?: string
  $imgProps?: {
    $width?: string
    $height?: string
    $maxWidth?: string
    $maxHeight?: string
    $borderRadius?: string
  }
  $figcaptionProps?: {
    $fontSize?: string
    $fontFamily?: keyof typeof theme.fonts
    $color?: keyof typeof theme.colors
    $linHeight?: string
    $width?: string
    $maxWidth?: string
    $height?: string
    $maxHeight?: string
    $pt?: string
    $pb?: string
    $pr?: string
    $pl?: string
    $mt?: string
    $mb?: string
    $mr?: string
    $ml?: string
    $align?: string
  }
}>`
  p.p__hero {
    ${({
      $fontFamily,
      $fontSize,
      $lineHeight,
      $color,
      $fontWeight,
      $mt,
      $mb,
      $ml,
      $mr,
    }) => css`
      font-family: ${$fontFamily ? theme.fonts[$fontFamily] : 'inherit'};
      font-size: ${$fontSize ?? 'inherit'};
      line-height: ${$lineHeight ?? 'normal'};
      color: ${$color ? theme.colors[$color] : 'inherit'};
      font-weight: ${$fontWeight ?? 'normal'};
      margin-top: ${$mt ?? '0'};
      margin-bottom: ${$mb ?? '0'};
      margin-left: ${$ml ?? '0'};
      margin-right: ${$mr ?? '0'};
    `}
  }

  figure.img__hero {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      ${({ $imgProps }) =>
        $imgProps &&
        css`
          width: ${$imgProps.$width ?? 'auto'};
          height: ${$imgProps.$height ?? 'auto'};
          max-width: ${$imgProps.$maxWidth ?? '100%'};
          max-height: ${$imgProps.$maxHeight ?? 'auto'};
          border-radius: ${$imgProps.$borderRadius ?? '0'};
        `}
    }
  }

  figcaption.figcaption__hero {
    ${({ $figcaptionProps }): any => {
      $figcaptionProps != null && css``
    }}

    .figcaption__paragraph {
      ${({ $figcaptionProps }) =>
        $figcaptionProps &&
        css`
          font-size: ${$figcaptionProps.$fontSize};
          font-family: ${$figcaptionProps.$fontFamily
            ? theme.fonts[$figcaptionProps.$fontFamily]
            : 'inherit'};
          color: ${$figcaptionProps.$color
            ? theme.colors[$figcaptionProps.$color]
            : 'inherit'};
          width: ${$figcaptionProps.$width ?? 'auto'};
          max-width: ${$figcaptionProps.$maxWidth ?? '100%'};
          height: ${$figcaptionProps.$height ?? 'auto'};
          max-height: ${$figcaptionProps.$maxHeight ?? 'auto'};
          padding-top: ${$figcaptionProps.$pt ?? '0'};
          padding-bottom: ${$figcaptionProps.$pb ?? '0'};
          padding-right: ${$figcaptionProps.$pr ?? '0'};
          padding-left: ${$figcaptionProps.$pl ?? '0'};
          margin-top: ${$figcaptionProps.$mt ?? '0'};
          margin-bottom: ${$figcaptionProps.$mb ?? '0'};
          margin-right: ${$figcaptionProps.$mr ?? '0'};
          margin-left: ${$figcaptionProps.$ml ?? '0'};
          text-align: ${$figcaptionProps.$align ?? 'left'};
        `}
    }
  }
`
