import { type ReactElement } from 'react'
import { type TextHandlersProps } from './types'
import Boxes from '../../Boxes/Boxes'
import Text from '../../Typography'

export default function TextHandlers ({ children, color, as, font_family, font_size, line_height, childrenType, transform }: TextHandlersProps): ReactElement {
  return (
    <Boxes
      noWrap
    >
      <Text
        as={as}
        css={{
          color,
          fontFamily: font_family,
          fontSize: font_size,
          transform,
          lineHeight: line_height
        }}
      >
        {children}
      </Text>
    </Boxes>
  )
}
