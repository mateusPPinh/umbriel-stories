import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { sampleArticles } from '../mocks/sampleArticles'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateLayoutThreeColumns',
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
  threeColumns: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  }
}

const blocksDataThreeColumns: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    layout: 'layoutPadrao',
    template: 'TemplateLayoutThreeColumns',
    articles: sampleArticles,
    config: layoutConfigurations.threeColumns
  }
]

export const SeventyThirty: Story = {
  args: {
    blocksData: blocksDataThreeColumns
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[1200px] w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
