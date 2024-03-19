/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { type ElementType, type ReactNode } from 'react'
import { type SlotAnchorHandlersProps } from '../utils/SlotAnchorHandlers/types'
import { type DefaultTheme } from 'styled-components/dist/types'

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
  blockPosition: string
  layout: string
  template: 'Template5050'
  textProps?: {
    title?: string
    subtitle?: string
    color?: any // corrigir para usar o theme
    as?: ElementType
    font_family?: string
    font_size?: string | number
    line_height?: string | number
    transform?: string
  }
  target?: '_blank' | '_self' | '_parent' | '_top'
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
  template50Options?: {
    slot_left_bgColor?: keyof DefaultTheme['colors']
    slot_right_bgColor?: keyof DefaultTheme['colors']
    align_text_slot_left?: string
    align_text_slot_right?: string
    anchorHandlerProps?: Pick<SlotAnchorHandlersProps,
    'isSlotImageLeftAnchor'
    |
    'isSlotImageRightAnchor'
    |
    'isSlotLeftTitleAnchor'
    |
    'isSlotNodeLeftAnchor'
    |
    'href'
    |
    'index'
    |
    'isSlotNodeRightAnchor'
    |
    'isSlotRightTitleAnchor'
    |
    'position'
    >
  }
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
  className?: string
}
