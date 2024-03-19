/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type ReactElement } from 'react'
import Box from '../../components/Boxes/Boxes'
import PageBlockRenderer from '../../components/PageBlock/PageBlock'
import array from '../../components/template50mode2.json'
import Text from '../../components/Typography'

const PageHome = (): ReactElement => {
  return (
    <Box>
      {array.map((block, index) => {
        const {
          template,
          layout,
          menu,
          footer,
          layoutCarrousel,
          centerMiddle
        } = block.blocksData

        return (
          <PageBlockRenderer
            key={index}
            template={template !== '' ? 'Template5050' : 'Template100'}
            layout={layout}
            genericCarrousel={layoutCarrousel}
            genericFooter={footer}
            genericMenu={menu}
            // @ts-ignore
            centerMiddle={centerMiddle}
          />
        )
      })}
      <Text
        css={{
          color: 'white'
        }}
      >
        Hello
      </Text>
    </Box>
  )
}

export default PageHome
