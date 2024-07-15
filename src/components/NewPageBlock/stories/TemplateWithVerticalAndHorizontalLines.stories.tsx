import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateWithVerticalAndHorizontalLines } from '../mocks/templateWithVerticalAndHorizontalLines.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateWithVerticalAndHorizontalLines',
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
  withVerticalAndHorizontalLines: {
    layout: '"col1 col2 col2"',
    columns: [1, 2]
  }
}

const blocksDataWithVerticalAndHorizontalLines: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    layout: 'layoutPadrao',
    template: 'TemplateWithVerticalAndHorizontalLines',
    articles: templateWithVerticalAndHorizontalLines,
    config: layoutConfigurations.withVerticalAndHorizontalLines,
    blockTitle: 'Culture and Lifestyle'
  }
]

export const WithVerticalAndHorizontalLines: Story = {
  args: {
    blocksData: blocksDataWithVerticalAndHorizontalLines
  }
}
