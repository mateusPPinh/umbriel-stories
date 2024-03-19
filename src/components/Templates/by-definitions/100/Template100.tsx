import React from 'react'
import Box from '../../../Boxes/Boxes'
import { Column, ColumnColor } from './helpers'
import { type SlotDefinitions } from './types'

function Template100 (props: SlotDefinitions): React.ReactElement {
  const { bgColor, children, transparent, genericFooter, genericMenu } = props

  // Renderize o menu, footer, e carrousel aqui
  // ...

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
            {/* Aqui você renderiza o menu, carrossel, footer e o que mais precisar */}
            {genericMenu?.map((menuItem) => (
              <div key={menuItem.href}>{menuItem.title}</div>
            ))}
            {genericFooter?.map((footerItem) => (
              <div key={footerItem.footer?.title_top}>
                {footerItem.footer?.title_top}
                {/* ... outros elementos do footer */}
              </div>
            ))}
            {/* ... carrossel e outros elementos */}
            {children}
          </ColumnColor>
        </Column>
      </Box>
    </>
  )
}

export default Template100
