import { type ReactElement } from 'react'
import styled from 'styled-components'
import { type CSSConditionProps } from './types'

const BorderYRight = styled.div<{
  $borderYRightColor: string
  $borderYRightPadding: string
  $borderYLeftMargin: string
}>`
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: ${({ $borderYRightColor }) => $borderYRightColor};
  padding-right: ${({ $borderYRightPadding }) => $borderYRightPadding};
  margin-right: ${({ $borderYLeftMargin }) => $borderYLeftMargin};
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
`

export default function ShouldRenderYBorderRightDivider ({
  borderYRightColor = '#DFDFDF',
  borderYRightPadding = '10px',
  borderYLeftMargin = '-20px'
}: CSSConditionProps): ReactElement {
  return (
    <BorderYRight
      $borderYRightColor={borderYRightColor}
      $borderYRightPadding={borderYRightPadding}
      $borderYLeftMargin={borderYLeftMargin}
    />
  )
}
