import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateLayoutNewsBlock } from '../mocks/templateLayoutNewsBlock.mock'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateLayoutNewsBlock',
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
  newsBlock: {
    layout: '"col1 col1 col1 col1 col1" "col2 col2 col2 col2 col2"',
    columns: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
}

const blocksDataNewsBlock: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateLayoutNewsBlock',
    config: layoutConfigurations.newsBlock,
    blockTitle: 'News',
    blocksData: {
      centerMiddle: { articles: templateLayoutNewsBlock },
      components: []
    },
    pageId: ''
  }
]

export const TemplateLayoutNewsBlockDesktop: Story = {
  args: {
    blocksData: blocksDataNewsBlock
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="p-4">
      <div className="flex mb-1 flex-col items-start ml-2">
          <h1 className="text-3xl mt-4">Article extendend block - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
           block identifier + one highlight image + three links
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const TemplateLayoutNewsBlockMobile: Story = {
  args: {
    blocksData: blocksDataNewsBlock
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="p-4">
      <div className="flex mb-1 flex-col items-start ml-2">
          <h1 className="text-3xl mt-4">Article extendend block - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
           block identifier + one highlight image + three links
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
