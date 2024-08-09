/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ReactElement } from 'react'
import { PreviewImage } from '../../styles'
import type PreviewProps from './types'

export default function Preview ({
  images,
  path,
  title,
  description,
  id
}: PreviewProps): ReactElement {
  return (
    <div className='relative'>
      <PreviewImage key={id}>
      {images.length > 0 && <img src={images[0].url} alt={images[0].caption} className="object-cover"/>}

      <div className="text-content absolute">
        <a href={path}>
          <h1>{title}</h1>
        </a>
        <h2>{description}</h2>
      </div>
    </PreviewImage>
    </div>
  )
}
