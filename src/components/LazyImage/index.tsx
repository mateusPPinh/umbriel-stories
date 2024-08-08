import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '../NewPageBlock/templates/styles/TemplateSeventyThirtyWithCarousel.styles'

interface LazyImageProps {
  src: string
  alt: string
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      {!inView && <Skeleton />}{' '}
      <img
        ref={ref}
        src={inView ? src : undefined}
        alt={alt}
        style={{ display: inView ? 'block' : 'none' }}
      />
    </>
  )
}

export default LazyImage
