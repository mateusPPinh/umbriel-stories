import React, { ReactElement } from 'react'
import { type IconProps } from './types'

export default function BurgerIcon({
  fill = '#5A5A5A',
}: IconProps): ReactElement {
  return (
    <svg
      width="37"
      height="62"
      viewBox="0 0 37 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.71011e-06 31L6.11894 37.1425L30.8811 62L37 55.8575L12.2379 31L37 6.14251L30.8811 3.27976e-06L6.11894 24.8575L2.71011e-06 31Z"
        fill={fill}
      />
    </svg>
  )
}
