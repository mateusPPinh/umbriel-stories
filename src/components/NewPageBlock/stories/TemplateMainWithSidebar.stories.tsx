import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateMainWithSidebar } from '../mocks/templateMainWithSidebar.mock'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/Template30-40-30',
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
  mainWithSidebar: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  }
}

const blocksDataMainWithSidebar: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateMainWithSidebar',
    config: layoutConfigurations.mainWithSidebar,
    blocksData: {
      centerMiddle: {
        articles: templateMainWithSidebar
      },
      components: []
    },
    pageId: ''
  }
]

export const T304030Desktop: Story = {
  args: {
    blocksData: blocksDataMainWithSidebar
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[1400px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Template 30% - 40% - 30% Desktop</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const T304030Mobile: Story = {
  args: {
    blocksData: blocksDataMainWithSidebar
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Mobile</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
