import styled from 'styled-components'

export const LinkedinContainer = styled.div<{
  $mt?: number | string
  $mr?: number | string
  $mb?: number | string
  $ml?: number | string
}>`
  margin-top: ${(props) => props.$mt};
  margin-right: ${(props) => props.$mr};
  margin-bottom: ${(props) => props.$mb};
  margin-left: ${(props) => props.$ml};
`
