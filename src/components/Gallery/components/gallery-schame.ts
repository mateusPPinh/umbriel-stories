const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const umbrielImageAPIDelivery = (url: string, width: number, height: number) =>
  `https://source.unsplash.com/${url}/${width}x${height}`

const apiPics = [
  { url: '8gVv6nxq6gY', width: 1080, height: 800 }
]

const photos = apiPics.map((photo) => ({
  src: umbrielImageAPIDelivery(photo.url, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint)
    return {
      src: umbrielImageAPIDelivery(photo.url, breakpoint, height),
      width: breakpoint,
      height
    }
  })
}))

export default photos
