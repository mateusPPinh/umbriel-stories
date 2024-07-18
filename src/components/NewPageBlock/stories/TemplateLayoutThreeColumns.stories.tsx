import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateLayoutThreeColumns } from '../mocks/templateLayoutThreeColumns.mock'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateLayoutThreeColumns',
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
  threeColumns: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  }
}

const blocksDataThreeColumns: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateLayoutThreeColumns',
    config: layoutConfigurations.threeColumns,
    blockTitle: 'Weekend Reads',
    blocksData: {
      centerMiddle: {
        articles: templateLayoutThreeColumns
      },
      components: []
    },
    pageId: '',
    articleId: ''
  }
]

export const TwoColumnThreeItemPeerColumnsDesktop: Story = {
  args: {
    blocksData: blocksDataThreeColumns
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[1200px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Two Columns + 3 itens peer columns + divider peer column item - Desktop</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const TwoColumnThreeItemPeerColumnsMobile: Story = {
  args: {
    blocksData: blocksDataThreeColumns
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
          <h1 className="text-3xl sm:text-xl">Column layout</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
