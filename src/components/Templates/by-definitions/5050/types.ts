import { type DefaultTheme } from 'styled-components/dist/types'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Template50Types {
  blockPosition?: number
  layout?: string
  template: 'Template5050'
  maxImagesLeft?: number
  maxImagesRight?: number
  slot_right_items?: {
    content: any[]
    image?: {
      desktop_image_path: string
      mobile_image_path: string
    }
  }
  slot_left_items?: {
    content: any[]
    image?: {
      desktop_image_path: string
      mobile_image_path: string
    }
  }
  slot_left_bgColor?: any | keyof DefaultTheme['colors']
  slot_right_bgColor?: any | keyof DefaultTheme['colors']
}
