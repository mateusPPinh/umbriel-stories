import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateBlockWithVerticalLine } from '../mocks/templateBlockWithVerticalLine.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateBlockWithVerticalLine',
  component: PageBlock,
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
    layout: 'layoutPadrao',
    template: 'TemplateBlockWithVerticalLine',
    articles: templateBlockWithVerticalLine,
    config: layoutConfigurations.blockWithVerticalLine,
    blockTitle: 'More News'
  }
]

export const BlockWithVerticalLine: Story = {
  args: {
    blocksData: blocksDataBlockWithVerticalLine
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
