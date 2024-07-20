import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateWithImageAndArticlesMock } from '../mocks/templateWithImageAndArticlesMock.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateWithImageAndArticles',
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
  templateWithImageAndArticles: {
    layout: '"image" "article" "divider" "col1" "divider" "col2" "divider" "col3" "divider" "col4"',
    columns: [2, 1, 1, 1, 1]
  }
}

const blocksDataSeventyThirtyWithTwoImages: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateWithImageAndArticles',
    config: layoutConfigurations.templateWithImageAndArticles,
    blocksData: {
      centerMiddle: {
        articles: templateWithImageAndArticlesMock
      },
      components: []
    },
    pageId: '',
    articleId: ''
  }
]

export const TemplateWithImageAndArticles: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
