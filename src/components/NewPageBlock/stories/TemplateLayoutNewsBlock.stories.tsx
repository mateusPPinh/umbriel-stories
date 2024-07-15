import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateLayoutNewsBlock } from '../mocks/templateLayoutNewsBlock.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateLayoutNewsBlock',
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
  newsBlock: {
    layout: '"col1 col1 col1 col1 col1" "col2 col2 col2 col2 col2"',
    columns: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
}

const blocksDataNewsBlock: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    layout: 'layoutPadrao',
    template: 'TemplateLayoutNewsBlock',
    articles: templateLayoutNewsBlock,
    config: layoutConfigurations.newsBlock,
    blockTitle: 'News'
  }
]

export const TemplateLayoutNewsBlock: Story = {
  args: {
    blocksData: blocksDataNewsBlock
  }
}
