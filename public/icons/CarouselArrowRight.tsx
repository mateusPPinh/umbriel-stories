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
        d="M15 9.51267L5.86375 0H0L7.65207 7.96733L9.06326 9.43667L9.12409 9.5L0 19H5.87591L15 9.51267Z"
        fill={fill}
      />
    </svg>
  )
}
