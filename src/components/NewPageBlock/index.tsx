import React from 'react'
import { type PageBlockProps } from './PageBlock.types'
import Template5050 from './templates/Template5050'
import TemplateFeatured from './templates/TemplateFeatured'
import TemplateFullWidth from './templates/TemplateFullWidth'
import TemplateHalfAndHalf from './templates/TemplateLayoutHalfAndHalf'
import TemplateLayoutThreeColumns from './templates/LayoutThreeColumns'
import TemplateSeventyThirty from './templates/TemplateSeventyThirty'
import TemplateSeventyThirtyWithTwoImages from './templates/TemplateSeventyThirtyWithTwoImages'
import TemplateMainWithSidebar from './templates/TemplateMainWithSidebar'
import TemplateBlockWithVerticalLine from './templates/TemplateBlockWithVerticalLine'
import TemplateWithVerticalAndHorizontalLines from './templates/TemplateWithVerticalAndHorizontalLines'
import TemplateLayoutNewsBlock from './templates/TemplateLayoutNewsBlock'

const PageBlock: React.FC<PageBlockProps> = ({ blocksData }) => {
  return (
    <div className="page-block">
      {blocksData.map((blockData, index) => {
        const { template, articles, config, template50, blockTitle } = blockData
        // Parse layout if it's a stringified JSON
        let parsedLayout = config.layout
        try {
          parsedLayout = typeof config.layout === 'string' ? JSON.parse(config.layout) : config.layout
        } catch (error) {
          console.error('Error parsing layout JSON:', error)
        }

        switch (template) {
          case 'Template5050':
            return (
              <Template5050
                key={index}
                articles={articles}
                descriptions={template50?.descriptions ?? []}
                config={{ ...config, layout: parsedLayout }}
                blockTitle='What to Watch and Read'
                headingsProps={template50?.headingsProps}
              />
            )
          case 'TemplateFeatured':
            return <TemplateFeatured key={index} articles={articles} config={{ ...config, layout: parsedLayout }} />
          case 'TemplateFullWidth':
            return <TemplateFullWidth key={index} articles={articles} />
          case 'TemplateHalfAndHalf':
            return <TemplateHalfAndHalf key={index} articles={articles} />
          case 'TemplateLayoutThreeColumns':
            return <TemplateLayoutThreeColumns key={index} articles={articles} blockTitle={blockTitle ?? ''} />
          case 'TemplateSeventyThirty':
            return <TemplateSeventyThirty key={index} articles={articles} />
          case 'TemplateSeventyThirtyWithTwoImages':
            return <TemplateSeventyThirtyWithTwoImages key={index} articles={articles} />
          case 'TemplateMainWithSidebar':
            return <TemplateMainWithSidebar key={index} articles={articles} />
          case 'TemplateBlockWithVerticalLine':
            return <TemplateBlockWithVerticalLine key={index} articles={articles} blockTitle={blockTitle ?? ''} />
          case 'TemplateWithVerticalAndHorizontalLines':
            return <TemplateWithVerticalAndHorizontalLines key={index} articles={articles} blockTitle={blockTitle ?? ''} />
          case 'TemplateLayoutNewsBlock':
            return <TemplateLayoutNewsBlock key={index} articles={articles} />
          default:
            return <div key={index}>Template not found</div>
        }
      })}
    </div>
  )
}

export default PageBlock
