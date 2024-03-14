import { type ReactNode } from 'react'

export interface SlotAnchorHandlersProps {
  /** Node element to be affected  */
  children?: ReactNode

  /** Conditionally applies an anchor around the slot title element on the left side  */
  isSlotLeftTitleAnchor?: boolean

  /** Conditionally applies an anchor around the slot title element on the right side  */
  isSlotRightTitleAnchor?: boolean

  /** Conditionally applies an anchor around the slot image element on the right side  */
  isSlotImageRightAnchor?: boolean

  /** Conditionally applies an anchor around the slot image element on the left side  */
  isSlotImageLeftAnchor?: boolean

  /** Conditionally applies an anchor around every element in the right slot */
  isSlotNodeRightAnchor?: boolean

  /** Conditionally applies an anchor around every element in the left slot */
  isSlotNodeLeftAnchor?: boolean

  /** Apply link for navigation */
  href?: string

  /** Define position */
  position?: 'slot_left' | 'slot_right'

  /** Define Index */
  index?: number

  /** Target options */
  target?: '_blank' | '_self' | '_parent' | '_top'
}
