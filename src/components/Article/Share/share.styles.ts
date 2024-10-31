import styled from 'styled-components'

export const Container = styled.div<{
  $mt?: number | string
  $mr?: number | string
  $mb?: number | string
  $ml?: number | string
  $width?: string
  $maxWidth?: string
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
  align-items: center;
  justify-content: ${(props) => props.$justifyContent};
  max-width: ${(props) => props.$maxWidth};
  flex-direction: ${(props) => props.$flexDirection};
`
