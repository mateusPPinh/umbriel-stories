import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateFeatured } from '../mocks/templateFeatured'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateSeventyTextThirtyImage',
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
  featured: {
    layout:
      '"image image" "caption caption" "title title" "desc desc" "col1 col2"',
    columns: [1, 1]
  }
}

const blocksDataFeatured: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    layout: 'layoutPadrao',
    template: 'TemplateFeatured',
    articles: templateFeatured,
    config: layoutConfigurations.featured
  }
]

export const SeventyTextThirtyImage: Story = {
  args: {
    blocksData: blocksDataFeatured
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[600px] w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
