import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateWithVerticalAndHorizontalLines } from '../mocks/templateWithVerticalAndHorizontalLines.mock'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateWithVerticalAndHorizontalLines',
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
  withVerticalAndHorizontalLines: {
    layout: '"col1 col2 col2"',
    columns: [1, 2]
  }
}

const blocksDataWithVerticalAndHorizontalLines: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateWithVerticalAndHorizontalLines',
    config: layoutConfigurations.withVerticalAndHorizontalLines,
    blockTitle: 'Culture and Lifestyle',
    blocksData: {
      centerMiddle: {
        articles: templateWithVerticalAndHorizontalLines
      },
      components: []
    },
    pageId: ''
  }
]

export const T7030ColumnRowDesktop: Story = {
  args: {
    blocksData: blocksDataWithVerticalAndHorizontalLines
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
          <h1 className="text-3xl">T7030 Column - Row - Dividers - Desktop</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const T7030ColumnRowMobile: Story = {
  args: {
    blocksData: blocksDataWithVerticalAndHorizontalLines
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Mobile</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
