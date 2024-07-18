import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateBlockWithVerticalLine } from '../mocks/templateBlockWithVerticalLine.mock'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/Template100-X-Y',
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
  blockWithVerticalLine: {
    layout: '"col1 col1 col1 col1 col1"',
    columns: [1, 1, 1, 1, 1]
  }
}

const blocksDataBlockWithVerticalLine: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateBlockWithVerticalLine',
    config: layoutConfigurations.blockWithVerticalLine,
    blockTitle: 'More News',
    blocksData: {
      centerMiddle: {
        articles: templateBlockWithVerticalLine
      },
      components: []
    },
    pageId: ''
  }
]

export const Template100HorizontalDesktop: Story = {
  args: {
    blocksData: blocksDataBlockWithVerticalLine
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Template100 - Horizontal + Vertical Divider - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
          Imagem + Title + Subtitle
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const Template100VerticalMobile: Story = {
  args: {
    blocksData: blocksDataBlockWithVerticalLine
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full p-4 h-vh">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Template100 - Vertical - Mobile</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
          Imagem + Title + Subtitle
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
