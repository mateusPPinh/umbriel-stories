import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateFeatured } from '../mocks/templateFeatured'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateSeventyTextThirtyImage',
  component: PageBlock,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop'
    }
  },
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    'blocksData[0].config.layout': {
      control: 'text'
    },
    'blocksData[0].config.columns': {
      control: 'array'
    }
  }
}

export default meta

type Story = StoryObj<typeof PageBlock>

const layoutConfigurations = {
  featured: {
    layout:
      '"image image" "caption caption" "title title" "desc desc" "col1 col2"',
    columns: [1, 1]
  }
}

const blocksDataFeatured: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateFeatured',
    config: layoutConfigurations.featured,
    blocksData: {
      centerMiddle: {
        articles: templateFeatured
      },
      components: []
    },
    pageId: '',
    articleId: ''
  }
]

export const SeventyTextThirtyColumnTopRowBottomDesktop: Story = {
  args: {
    blocksData: blocksDataFeatured
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[600px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">T7030 - Top(Column) - Bottom(Row-Justify) + Divider - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
          Imagem + Title + Subtitle
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const SeventyTextThirtyColumnTopRowBottomMobile: Story = {
  args: {
    blocksData: blocksDataFeatured
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Mobile</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
