import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { sampleArticles } from '../mocks/sampleArticles'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateFullWidthInColumn',
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
  fullWidth: {
    layout: '"col1 col1 col1"',
    columns: [3]
  }
}

const blocksDataFullWidth: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateFullWidth',
    config: layoutConfigurations.fullWidth,
    blocksData: {
      centerMiddle: {
        articles: sampleArticles
      },
      components: []
    },
    pageId: ''
  }
]

export const FullWidth: Story = {
  args: {
    blocksData: blocksDataFullWidth
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[500px] w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
