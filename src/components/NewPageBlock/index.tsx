// components/PageBlock.tsx
import React from 'react'
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
import Template5050Grid from './templates/Template5050Grid'
import TemplateSlot100FeaturedRelated from './templates/TemplateSlot100-FeaturedRelated'
import { type PageBlockProps, type BlockData } from './PageBlock.types'
import TemplateSideColumns from './templates/TemplateSideColumns'
import TemplateNewsletter from './templates/TemplateNewsletter'
import TemplateWithImageAndArticles from './templates/TemplateWithImageAndArticles'
import T3070Variation from './templates/variations/3070'
import TemplateSeventyThirtyWithCarousel from './templates/TemplateSeventyThirtyWithCarousel'
import EditorialTemplate from './templates/EditorialTemplate'
import T7030WithinNewsletter from './templates/variations/T7030WithinNewsletter'

const PageBlock: React.FC<PageBlockProps> = ({ blocksData, loading }) => {
  return (
    <div className="page-block">
      {blocksData.map((blockData: BlockData, index) => {
        const {
          template,
          blocksData,
          config,
          template50,
          blockTitle,
          templateSlot100FeaturedRelatedProps,
        } = blockData
        const articles = blocksData.centerMiddle.articles

        switch (template) {
          case 'Template5050':
            return (
              <Template5050
                key={index}
                articles={articles}
                descriptions={template50?.descriptions ?? []}
                config={config}
                blockTitle={blockTitle}
                headingsProps={template50?.headingsProps}
              />
            )
          case 'TemplateFeatured':
            return (
              <TemplateFeatured
                key={index}
                articles={articles}
                config={config}
              />
            )
          case 'TemplateFullWidth':
            return <TemplateFullWidth key={index} articles={articles} />
          case 'TemplateHalfAndHalf':
            return <TemplateHalfAndHalf key={index} articles={articles} />
          case 'TemplateLayoutThreeColumns':
            return (
              <TemplateLayoutThreeColumns
                key={index}
                articles={articles}
                blockTitle={blockTitle ?? ''}
              />
            )
          case 'TemplateSeventyThirty':
            return <TemplateSeventyThirty key={index} articles={articles} />
          case 'TemplateSeventyThirtyWithTwoImages':
            return (
              <TemplateSeventyThirtyWithTwoImages
                key={index}
                articles={articles}
              />
            )
          case 'TemplateMainWithSidebar':
            return <TemplateMainWithSidebar key={index} articles={articles} />
          case 'TemplateBlockWithVerticalLine':
            return (
              <TemplateBlockWithVerticalLine
                key={index}
                articles={articles}
                blockTitle={blockTitle ?? ''}
              />
            )
          case 'TemplateWithVerticalAndHorizontalLines':
            return (
              <TemplateWithVerticalAndHorizontalLines
                key={index}
                articles={articles}
                blockTitle={blockTitle ?? ''}
              />
            )
          case 'TemplateLayoutNewsBlock':
            return (
              <TemplateLayoutNewsBlock
                key={index}
                articles={articles}
                loading={loading}
              />
            )
          case 'Template5050Grid':
            return (
              <Template5050Grid
                key={index}
                articles={articles}
                config={config}
              />
            )
          case 'TemplateSlot100FeaturedRelated':
            return (
              <TemplateSlot100FeaturedRelated
                key={index}
                articles={articles}
                config={config}
                templateSlot100FeaturedRelatedProps={
                  templateSlot100FeaturedRelatedProps ?? {
                    blockSubject: '',
                    bgColor: '#fff',
                    blockSubjectColor: '#333',
                    articleTitleColor: '#000',
                    blockBorderRadius: '4px',
                  }
                }
                blockTitle={blockTitle}
              />
            )
          case 'TemplateSideColumns':
            return (
              <TemplateSideColumns
                key={index}
                articles={articles}
                config={config}
              />
            )
          case 'TemplateNewsletter':
            return (
              <TemplateNewsletter
                key={index}
                articles={articles}
                config={config}
              />
            )
          case 'TemplateWithImageAndArticles':
            return (
              <TemplateWithImageAndArticles
                key={index}
                articles={articles}
                blockTitle="Block de Image-Article"
              />
            )
          case 'T3070Variation':
            return <T3070Variation key={index} articles={articles} />
          case 'EditorialTemplate':
            return (
              <EditorialTemplate
                key={index}
                articles={articles}
                loading={loading}
              />
            )
          case 'T7030WithinNewsletter':
            return <T7030WithinNewsletter key={index} articles={articles} />
          case 'TemplateSeventyThirtyWithCarousel':
            return (
              <TemplateSeventyThirtyWithCarousel
                key={index}
                articles={articles}
                config={config}
                shouldRenderBorderBottom={
                  blockData.templateSeventyCarouselProps
                    ?.shouldRenderBorderBottom
                }
              />
            )
          default:
            return <div key={index}>Template not found</div>
        }
      })}
    </div>
  )
}

export default PageBlock
