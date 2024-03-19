import { type ElementType } from 'react'
import { type SlotAnchorHandlersProps } from 'src/components/utils/SlotAnchorHandlers/types'
import { type DefaultTheme } from 'styled-components'

export interface Template50Types {
  blockPosition?: string
  layout?: string
  template: 'Template5050'
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
  target?: '_blank' | '_self' | '_parent' | '_top'
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
