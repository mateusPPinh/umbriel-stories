import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { t7030WithinNewsletter as mock } from '../mocks/t7030WithinNewsletter.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/T7030WithinNewsletter',
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
  t7030WithinNewsletter: {
    layout: '"col1" "col2"',
    columns: [1, 1],
  },
}

const blocksDataSeventyThirtyWithTwoImages: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'T7030WithinNewsletter',
    config: layoutConfigurations.t7030WithinNewsletter,
    blocksData: {
      centerMiddle: {
        articles: mock,
      },
      components: [],
    },
    pageId: '',
    articleId: '',
  },
]

export const T7030WithinNewsletter: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages,
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full max-w-[1332px] p-4">
        <PageBlock {...args} />
      </div>
    </div>
  ),
}
