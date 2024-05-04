interface ImageDetail {
  id: number
  name?: string
  caption: string
  credits?: string
  description?: string
  url?: string
}

export default interface PreviewProps {
  id?: number
  title: string
  description?: string
  images: ImageDetail[]
  isGalleryUsersProfilePictures?: boolean
  path: string
}
