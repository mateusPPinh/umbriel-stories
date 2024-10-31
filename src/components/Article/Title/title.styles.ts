import styled from 'styled-components'
import { type theme } from '../../../styles/index'

export const Container = styled.div<{
  $containerWidth: string
  $marginBottom: string
}>`
  width: ${(props) => props.$containerWidth};
  margin-bottom: ${(props) => props.$marginBottom};

  @media (min-width: ${(props) => props.theme.queries.xl}) {
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.queries.xs}) {
    max-width: 600px;
  }

  @media (width: 320px) {
    max-width: 600px;
  }
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

  @media (min-width: ${(props) => props.theme.queries.xs}) {
    font-size: 30px;
    line-height: 1.5;
  }

  @media (min-width: ${(props) => props.theme.queries.md}) {
    font-size: 30px !important;
    line-height: 1.2 !important;
  }

  @media (min-width: ${(props) => props.theme.queries.xl}) {
    font-size: 38px !important;
    line-height: 1.2 !important;
    width: 790px;
  }

  @media (min-width: 320px) {
    font-size: 33px;
    line-height: 1.5;
  }
`
