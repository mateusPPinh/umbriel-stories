/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { type ReactNode } from 'react'

export interface GenericItemsType {
  generics?: {
    menu?: {
      title: string
      href: string
    }
    footer?: {
      title_top: string
      title_bottom: string
    }
    layoutCarrousel?: {
      image_middle_desktop_path?: string
      image_mobile_path?: string
    }
  }
}

interface Slot100 {
  // @ts-ignore
  genericCarrousel?: GenericItemsType['generics']['layoutCarrousel']
  // @ts-ignore
  genericFooter?: GenericItemsType['generics']['footer']
  // @ts-ignore
  genericMenu?: GenericItemsType['generics']['menu']
  bgColor?: string
  children?: ReactNode
  minHeight?: [string, string]
  transparent?: boolean
  template: 'Template100'
}

interface CenterMiddleType {
  blockPosition: number
  layout: string
  template: 'Template5050'
  slot_left_bgColor?: string
  slot_right_bgColor?: string
  items: Array<{
    slot_right_items: {
      content: any[]
    }
    slot_left_items: {
      content: any[]
    }
  }>
}

export interface PageBlockTypes {
  layout?: string
  slot100?: Slot100
  template: 'Template5050' | 'Template100'
  items?: {
    slot_left_items?: {
      content: any[]
    }
    slot_right_items?: {
      content: any[]
    }
  }
  centerMiddle?: CenterMiddleType
}
