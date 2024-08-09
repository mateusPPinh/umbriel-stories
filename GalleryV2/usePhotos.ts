/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type ImageDataProps } from './types'

const breakpoints = [320, 640, 960, 1280, 1600, 1920]

export const formatPhotos = (images: ImageDataProps[]) => {
  return images.map(({ url }) => {
    const urlParams = new URLSearchParams(url.split('?')[1])
    const width = Number(urlParams.get('width'))
    const height = Number(urlParams.get('height'))

    return {
      src: url,
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => ({
        src: `${url.split('?')[0]}?width=${breakpoint}&height=${Math.round((height / width) * breakpoint)}&q=75`,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint)
      }))
    }
  })
}
