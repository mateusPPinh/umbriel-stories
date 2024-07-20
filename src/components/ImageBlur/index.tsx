import { type ReactElement } from 'react'
import { ImageBlur } from './styles'

interface Props {
  src: string
  alt: string
  decoding: 'sync' | 'async' | 'auto'
  loading: 'eager' | 'lazy'
  onLoad: (state: boolean) => void
  isLoading: boolean
  className: string
}

export default function BlurredImage ({
  src,
  alt,
  decoding,
  loading,
  onLoad,
  isLoading,
  className
}: Props): ReactElement {
  return (
    <ImageBlur
      $isLoading={isLoading}
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      onLoad={() => { onLoad(false) }}
      className={className}
    />
  )
}
