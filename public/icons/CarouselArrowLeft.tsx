import React, { ReactElement } from 'react'
import { type IconProps } from './types'

export default function CarouselArrowLeft({
  fill = '#ffffff',
}: IconProps): ReactElement {
  return (
    <svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.31624e-07 9.48733L9.13625 19L15 19L7.34793 11.0327L5.93674 9.56333L5.87591 9.5L15 0L9.12409 -5.13689e-07L8.31624e-07 9.48733Z"
        fill={fill}
      />
    </svg>
  )
}
