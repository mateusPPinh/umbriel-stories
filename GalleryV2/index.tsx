/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useCallback, useEffect, useState, type ReactElement } from 'react'
import PhotoAlbum from 'react-photo-album'
import { type GalleryProps } from './types'
import { Container, GalleryTitle, GallerySubtitle, ArrowButton, CloseButton, Embla, EmblaContainer, EmblaOverlay, EmblaSlide } from './styles'
import { formatPhotos } from './usePhotos'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import closeIcon from '../../../public/close-icon.svg'
import arrowLeft from '../../../public/arrow-left-icon.svg'
import arrowRight from '../../../public/arrow-right-icon.svg'

export default function GalleryV2 ({
  title, subtitle, titleFontProps,
  subtitleFontProps, useSlide,
  images
}: GalleryProps): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const [isOpen, setIsOpen] = useState(false)

  const openCarousel = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const closeCarousel = (): void => {
    setIsOpen(false)
  }

  useEffect(() => {
    if ((embla != null) && isOpen) {
      embla.scrollTo(currentIndex)
    }
  }, [embla, isOpen, currentIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!isOpen) return

      if (event.key === 'ArrowLeft') {
        embla?.scrollPrev()
      }

      if (event.key === 'ArrowRight') {
        embla?.scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, embla])

  const photos = formatPhotos(images)
  console.log(images)

  if ((titleFontProps == null) || (subtitleFontProps == null)) {
    throw new Error('props not found')
  }

  return (
    <Container>
      <GalleryTitle {...titleFontProps}>{title}</GalleryTitle>
      <GallerySubtitle {...subtitleFontProps}>{subtitle}</GallerySubtitle>
      <PhotoAlbum
        photos={photos}
        layout="columns"
        columns={4}
        spacing={10}
        onClick={({ index }) => { (useSlide ?? false) && openCarousel(index) }}
      />
      {isOpen && (
        <EmblaOverlay>
          <CloseButton onClick={closeCarousel}>
            <img src={closeIcon} alt="close" />
          </CloseButton>
          <Embla ref={emblaRef}>
            <EmblaContainer>
              {photos.map((photo, index) => (
                <EmblaSlide key={index}>
                  <img src={photo.src} alt="" />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </Embla>
          <ArrowButton onClick={() => (embla != null) && embla.scrollPrev()} left>
            <img src={arrowLeft} alt="Previous" />
          </ArrowButton>
          <ArrowButton onClick={() => (embla != null) && embla.scrollNext()} right>
            <img src={arrowRight} alt="Next" />
          </ArrowButton>
        </EmblaOverlay>
      )}
    </Container>
  )
}

GalleryV2.defaultProps = {
  titleFontProps: {
    fontSize: 23,
    fontWeight: 500,
    fontLineHeight: 20
  },
  subtitleFontProps: {
    fontSize: 18,
    fontWeight: 400,
    fontLineHeight: 22
  },
  useSlide: true,
  images: []
}
