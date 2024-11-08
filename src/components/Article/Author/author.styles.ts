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
  $borderColor: keyof typeof theme.colors
  $borderWidth: string
  $imageWidth?: string
  $imageHeight?: string
}>`
  /* @media (min-width: ${(props) => props.theme.queries.xs}) {
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
  } */

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
  border-color: ${(props) => props.theme.colors[props.$borderColor]};
  border-width: ${(props) => props.$borderWidth};
  width: ${(props) => props.$imageWidth};
  height: ${(props) => props.$imageHeight};
`

export const AuthorNameSection = styled.section<{
  $color?: keyof typeof theme.colors
  $fontSize?: string
  $lineHeight?: string
  $fontWeight?: string
  $showPublicationDate?: boolean
}>`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
  font-weight: ${(props) => props.$fontWeight};

  ${({ $showPublicationDate }) => {
    if (!$showPublicationDate) {
      return css`
        display: 'flex';
        flex-direction: column;
        align-items: center;
      `
    } else {
      return null
    }
  }};
`

export const AuthorNameParagraph = styled.p<{
  $color?: keyof typeof theme.colors
  $fontFamily: keyof typeof theme.fonts
  $fontSize?: string
  $lineHeight?: string
  $authorNameMarginLeft: string
  $fontWeight?: string
}>`
  color: ${(props) => props.$color};
  font-family: ${(props) => props.theme.fonts[props.$fontFamily]};
  font-size: ${(props) => props.$fontSize};
  line-height: ${(props) => props.$lineHeight};
  margin-left: ${(props) => props.$authorNameMarginLeft};
  font-weight: ${(props) => props.$fontWeight};

  /* @media (min-width: ${(props) => props.theme.queries.xl}) {
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
  } */
`

export const PublicationDateParagraph = styled.p`
  font-family: ${(props) => props.theme.fonts.dm};
  font-weight: 300;
  line-height: 140%;
  color: ${(props) => props.theme.colors.gray300};
  margin-left: 0.5rem;
  font-size: 13px;
`
