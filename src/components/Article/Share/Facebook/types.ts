export interface FacebookProps {
  mt?: number | string
  mr?: number | string
  mb?: number | string
  ml?: number | string
}

export interface FacebookShareButtonProps {
  amp: boolean
  facebookPath?: string
  facebookProps?: FacebookProps
  fbappid: string
  pageUrl: string
  size?: string
}
