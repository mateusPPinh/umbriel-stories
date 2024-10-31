import styled, { css } from 'styled-components'
import { type theme } from '../../../styles/index'

export const AuthorContainer = styled.div<{
  $width?: string
  $maxWidth?: string
  $mt?: number | string
  $mr?: number | string
  $mb?: number | string
  $ml?: number | string
  $flexDirection?: string
  $justifyContent?: string
  $alignItems?: string
}>`
  display: flex;
  width: ${(props) => props.$width};
  margin-top: ${(props) => props.$mt};
  margin-right: ${(props) => props.$mr};
  margin-bottom: ${(props) => props.$mb};
  margin-left: ${(props) => props.$ml};
  align-items: ${(props) => props.$alignItems};
  justify-content: ${(props) => props.$justifyContent};
  max-width: ${(props) => props.$maxWidth};
  flex-direction: ${(props) => props.$flexDirection};
`

export const AuthorImage = styled.img<{
  $hasThumb: boolean
  $borderRadius?: string
  $height?: string
  $borderColor?: keyof typeof theme.colors
  $borderWidth: string
  $imageWidth?: string
  $imageHeight?: string
}>`
  @media (min-width: ${(props) => props.theme.queries.xs}) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 320px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: ${(props) => props.theme.queries.xl}) {
    width: 52px;
    height: 52px;
  }

  /* @media (min-width: ${(props) => props.theme.queries.sm}) {
    font-size: 22px;
    line-height: 1.5;
  }

  @media (min-width: 320px) {
    font-size: 27px;
    line-height: 1.5;
  }; */

  // se não houver imagem, display none e deixa o espaço para os dados em texto do autor
  ${({ $hasThumb }) => {
    if (!$hasThumb) {
      return css`
        display: 'none';
      `
    } else {
      return null
    }
  }};

  border-radius: ${(props) => props.$borderRadius};
  height: ${(props) => props.$height};
  border-color: ${(props) => props.$borderColor};
  border-width: ${(props) => props.$borderWidth};
  width: ${(props) => props.$imageWidth};
  height: ${(props) => props.$imageHeight};
`

export const AuthorNameSection = styled.section<{
  $color?: keyof typeof theme.colors
  $fontFamily?: keyof typeof theme.fonts
  $fontSize?: string
  $lineHeight?: string
}>`
  color: ${(props) => props.$color};
  font-family: ${(props) => props.$fontFamily};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
`

export const AuthorNameParagraph = styled.p<{
  $color?: keyof typeof theme.colors
  $fontFamily?: keyof typeof theme.fonts
  $fontSize?: string
  $lineHeight?: string
  $authorNameMarginLeft: string
}>`
  color: ${(props) => props.$color};
  font-family: ${(props) => props.$fontFamily};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
  margin-left: ${(props) => props.$authorNameMarginLeft};

  @media (min-width: ${(props) => props.theme.queries.xl}) {
    font-size: 18px !important;
    line-height: 1.5;
  }

  @media (min-width: ${(props) => props.theme.queries.md}) {
    font-size: 20px !important;
    line-height: 1.4;
  }

  @media (min-width: ${(props) => props.theme.queries.xs}) {
    font-size: 23px;
    line-height: 1.5;
  }

  @media (min-width: ${(props) => props.theme.queries.sm}) {
    font-size: 22px;
    line-height: 1.5;
  }

  @media (width: 320px) {
    font-size: 27px;
    line-height: 1.5;
  }
`
