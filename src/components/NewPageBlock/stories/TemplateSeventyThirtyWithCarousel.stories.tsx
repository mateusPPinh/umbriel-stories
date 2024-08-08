import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { templateSeventyThirtyWithCarouselArticles } from '../mocks/templateSeventyThirtyWithCarouselArticles.mock'
import { type BlockData } from '../PageBlock.types'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/SeventyThirtyWithCarousel',
  component: PageBlock,
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    'blocksData[0].config.layout': {
      control: 'text',
    },
    'blocksData[0].config.columns': {
      control: 'array',
    },
  },
}

export default meta

type Story = StoryObj<typeof PageBlock>

const layoutConfigurations = {
  seventyThirtyWithCarousel: {
    layout: '"carousel" "video" "articles"',
    columns: [1, 2],
  },
}

const blocksDataSeventyThirtyWithCarousel: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateSeventyThirtyWithCarousel',
    config: layoutConfigurations.seventyThirtyWithCarousel,
    blocksData: {
      centerMiddle: {
        articles: templateSeventyThirtyWithCarouselArticles,
      },
      components: [],
    },
    pageId: '',
    articleId: '',
  },
]

export const SeventyThirtyWithCarouselDesktop: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithCarousel,
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full max-w-[1400px] p-4">
        <PageBlock {...args} />
      </div>
    </div>
  ),
}

export const SeventyThirtyWithCarouselMobile: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithCarousel,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full max-w-[1230px] p-4">
        <PageBlock {...args} />
      </div>
    </div>
  ),
}
