import React from 'react'
import Box from '../../../Boxes/Boxes'
import { Column, ColumnColor } from './helpers'
import { type SlotDefinitions } from './types'

function Template100 (props: SlotDefinitions): React.ReactElement {
  const { bgColor, transparent, genericFooter, genericMenu } = props
  return (
    <>
      <Box
        css={{
          width: '100%',
          flexDirection: 'row',
          verticalAlign: 'top',
          alignItems: 'center'
        }}
      >
        <Column>
          <ColumnColor bgColor={bgColor} transparent={transparent}>
            {genericMenu?.map((menuItem) => (
              <div key={menuItem.href}>{menuItem.title}</div>
            ))}
            {genericFooter?.map((footerItem) => (
              <div key={footerItem.footer?.title_top}>
                {footerItem.footer?.title_top}
                {footerItem.footer?.title_bottom}
              </div>
            ))}
          </ColumnColor>
        </Column>
      </Box>
    </>
  )
}

export default Template100
