// GalleryUtils.ts

export const parseImageUrl = (url: string): any => {
  const match = url.match(/uploads\/([^?]*)\?width=(\d+)&height=(\d+)/)
  if (match != null) {
    const [, fileName, width, height] = match
    return {
      fileName,
      width: parseInt(width, 10),
      height: parseInt(height, 10)
    }
  }
  return null
}
