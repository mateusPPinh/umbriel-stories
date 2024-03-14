/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { type ReactElement } from 'react'
import { type SlotAnchorHandlersProps } from './types'
import Anchor from '../../Anchor/Anchor'
import Box from '../../Boxes/Boxes'

export default function SlotAnchorHandlers ({
  children,
  isSlotImageLeftAnchor,
  isSlotImageRightAnchor,
  isSlotLeftTitleAnchor,
  isSlotRightTitleAnchor,
  href,
  isSlotNodeLeftAnchor,
  isSlotNodeRightAnchor,
  position,
  index,
  target,
  ...otherProps
}: SlotAnchorHandlersProps): ReactElement {
  const childOptions = ['Image', 'Text', 'TextHandlers']

  const wrapWithAnchorIfNeeded = (child: any, condition: boolean | undefined): ReactElement => {
    if (condition ?? false) {
      return (
        <Anchor href={href} target={target}>
          {child}
        </Anchor>
      )
    }
    return child
  }

  const renderedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      if (child.type === Box || child.type.displayName === 'Box') {
        const boxChildren = React.Children.map(child.props.children, (boxChild) => {
          if (React.isValidElement(boxChild)) {
            // Obtém o tipo do componente filho (Image, Title, etc.) add mais conforme necessidade
            // @ts-ignore
            const boxChildElementType = boxChild.type.displayName || boxChild.type.name

            const shouldWrapBoxChildWithAnchor =
              (boxChildElementType === childOptions[0] &&
              ((position === 'slot_left' && (isSlotImageLeftAnchor ?? false)) ||
              (position === 'slot_right' && (isSlotImageRightAnchor ?? false)))) ||
              (boxChildElementType === childOptions[2] &&
              ((position === 'slot_left' && (isSlotLeftTitleAnchor ?? false)) ||
              (position === 'slot_right' && isSlotRightTitleAnchor)))

            return wrapWithAnchorIfNeeded(boxChild, shouldWrapBoxChildWithAnchor)
          }
          return boxChild
        })

        return React.cloneElement(child, {
          ...child.props,
          children: boxChildren
        })
      }
    }
    return child
  })

  return (
    <Box noWrap {...otherProps}>
      {renderedChildren}
    </Box>
  )
}
