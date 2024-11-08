import styled from 'styled-components'
import { type theme } from '../../../styles/index'

export const Container = styled.div<{
  $containerWidth: string
  $marginBottom: string
  $containerMaxWidth?: string
}>`
  width: ${(props) => props.$containerWidth};
  margin-bottom: ${(props) => props.$marginBottom};
  max-width: ${(props) => props.$containerMaxWidth};
`

export const Heading = styled.h1<{
  $fontFamily: keyof typeof theme.fonts
  $fontWeight: string
  $lineHeight: string
  $fontSize: string
  $letterSpacing: string
  $color: keyof typeof theme.colors
}>`
  font-family: ${(props) => props.theme.fonts[props.$fontFamily]};
  font-weight: ${(props) => props.$fontWeight};
  line-height: ${(props) => props.$lineHeight};
  font-size: ${(props) => props.$fontSize};
  letter-spacing: ${(props) => props.$letterSpacing};
  color: ${(props) => props.theme.colors[props.$color]};

  /* @media (min-width: ${(props) => props.theme.queries.xl}) {
    font-size: 18px !important;
    line-height: 1.4 !important;
  }

  @media (min-width: ${(props) => props.theme.queries.xs}) {
    font-size: 24px;
    line-height: 1.5;
  }

  @media (min-width: ${(props) => props.theme.queries.md}) {
    font-size: 20px;
    line-height: 1.4;
  }

  @media (min-width: ${(props) => props.theme.queries.lg}) {
    font-size: 20px;
    line-height: 1.3;
  }

  @media (width: 320px) {
    font-size: 28px;
    line-height: 1.5;
  } */
`
