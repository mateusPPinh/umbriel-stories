import { useState, type ReactElement } from 'react'
import { Container } from './styles'
import Album from 'react-photo-album'
import { parseImageUrl } from './GalleryUtils'
import { type Album as AlbumProps } from './types'

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48]

const Gallery = ({ images, handleSelectImage, apiUploadURL = 'localhost:3001' }: AlbumProps): ReactElement => {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({})
  const imagesMapped = images
    ?.map((it) => {
      const parseURL = parseImageUrl(it.url)
      if (parseURL) {
        const { fileName, width, height } = parseURL

        return {
          id: it.id,
          src: it.url,
          width,
          height,
          srcSet: breakpoints.map((breakpoint) => {
            const newHeight = Math.round((height / width) * breakpoint)
            return {
              src: `http://${apiUploadURL}/uploads/${fileName}?width=${breakpoint}&height=${newHeight}`,
              width: breakpoint,
              height: newHeight
            }
          }),
          caption: it.caption,
          description: it.description
        }
      }
      return null
    })
    .filter(Boolean)

  return (
    <>
      <Album
        layout="columns"
        onClick={({ photo, index }) => {
          console.log('Selecionado index: ', index)
          handleSelectImage(photo)
        }}
        // @ts-expect-error
        photos={imagesMapped}
        renderPhoto={({ photo, imageProps }: any) => (
          <Container
            key={photo.id}
            onMouseEnter={() => {
              setHoverStates((prev) => ({ ...prev, [photo.id]: true }))
            }}
            onMouseLeave={() => {
              setHoverStates((prev) => ({ ...prev, [photo.id]: false }))
            }}
            style={{ position: 'relative' }}
            // @ts-expect-error
            hover={hoverStates[photo.id]}
          >
            <img
              {...imageProps}
              style={{ ...imageProps.style, objectFit: 'cover' }}
            />
            {hoverStates[photo.id] && (
              <div className="text-content">
                <h1>{photo.caption}</h1>
                <h2>
                  {photo.description || 'No description available'}
                </h2>
              </div>
            )}
          </Container>
        )}
      />
    </>
  )
}

export default Gallery
