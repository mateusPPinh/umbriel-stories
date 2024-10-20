import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateseventythirtywithtwoimages } from '../mocks/seventyThirtyWithTwoImages.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateSeventyThirtyWithTwoImages',
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
  seventyThirty: {
    layout: '"col1 col2 col2"',
    columns: [2, 1]
  }
}

const blocksDataSeventyThirtyWithTwoImages: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateSeventyThirtyWithTwoImages',
    config: layoutConfigurations.seventyThirty,
    blocksData: {
      centerMiddle: {
        articles: templateseventythirtywithtwoimages
      },
      components: []
    },
    pageId: '',
    articleId: ''
  }
]

export const SeventyThirtyWithTwoImages: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[1200px] w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
