import Template5050 from '../Templates/by-definitions/5050/Template50'
import Template100 from '../Templates/by-definitions/100/Template100'
import { type PageBlockTypes } from './types'
import Box from '../Boxes/Boxes'

const PageBlockRenderer: React.FC<PageBlockTypes> = (props: PageBlockTypes) => {
  const { template, slot100, centerMiddle, className } = props

  const templateComponentMap: any = {
    Template5050,
    Template100
  }

  const renderTemplates = (): any => {
    const templates = []

    if (slot100 != null && slot100.template === 'Template100') {
      const Template = templateComponentMap[template]
      const {
        bgColor,
        children,
        genericCarrousel,
        genericFooter,
        genericMenu,
        transparent
      } = slot100
      templates.push(
        <Template
          key="Template100"
          bgColor={bgColor}
          genericCarrousel={genericCarrousel}
          genericFooter={genericFooter}
          genericMenu={genericMenu}
          children={children}
          transparent={transparent}
        />
      )
    }

    if (centerMiddle != null && centerMiddle.template === 'Template5050') {
      const Template = templateComponentMap[centerMiddle.template]
      const {
        slot_left_items,
        slot_right_items,
        blockPosition,
        layout,
        template,
        template50Options,
        target,
        textProps
      } = centerMiddle
      templates.push(
        <Template
          key="Template5050"
          slot_left_items={slot_left_items}
          slot_right_items={slot_right_items}
          blockPosition={blockPosition}
          layout={layout}
          template={template}
          template50Options={template50Options}
          target={target}
          textProps={textProps}
        />
      )
    }

    // TODO: add a custom fallback
    if (templates.length === 0) {
      return <div>Nenhum template para renderizar.</div>
    }

    return templates
  }

  return <Box className={`pageblock ${className}`}>{renderTemplates()}</Box>
}

export default PageBlockRenderer
