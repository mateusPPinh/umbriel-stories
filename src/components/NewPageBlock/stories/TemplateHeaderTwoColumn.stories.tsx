import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { custom50Article } from '../mocks/custom50'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateHeaderTwoColumn',
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
  halfAndHalfWithImage: {
    layout: '"col1 col2"',
    columns: [1, 1]
  }
}

const blocksData5050: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    layout: 'layoutPadrao',
    template: 'Template5050',
    articles: custom50Article,
    config: layoutConfigurations.halfAndHalfWithImage,
    template50: {
      descriptions: ['BOOK REVIEW', 'STREAMING', 'BOOKS', 'MOVIE PREVIEW'],
      headingsProps: {
        fontSize: 15,
        fontWeight: '',
        transform: ''
      }
    }
  }
]

export const TemplateHeaderTwoColumn: Story = {
  args: {
    blocksData: blocksData5050
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[1200px] w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
