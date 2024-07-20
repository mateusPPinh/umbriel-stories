import { type ReactElement } from 'react'
import styled from 'styled-components'
import { type CSSConditionProps } from './types'

const BorderXBottom = styled.div<{ $borderXBottomColor: string, $borderXBottomPadding: string }>`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ $borderXBottomColor }) => $borderXBottomColor};
  padding-bottom: ${({ $borderXBottomPadding }) => $borderXBottomPadding};
`

export default function ShouldRenderXBorderBottomDivider ({
  borderXBottomColor = '#DFDFDF',
  borderXBottomPadding = '10px'
}: CSSConditionProps): ReactElement {
  return (
    <BorderXBottom
      $borderXBottomColor={borderXBottomColor}
      $borderXBottomPadding={borderXBottomPadding}
    />
  )
}
