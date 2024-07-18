import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { templateSideColumnsMock } from '../mocks/templateSideColumns.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateSideColumns',
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
  templateSideColumns: {
    layout: '"col1" "divider1" "col2" "divider2" "col3" "divider3" "col4" "divider4" "col5" "divider5" "col6" "divider6" "col7" "divider7" "col8" "divider8" "col9" "divider9" "col10" "divider10" "col11" "divider11" "col12" "divider12" "col13" "divider13" "col14" "divider14" "col15 col15 col16 col16" "divider15"',
    columns: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
}

const blocksDataSeventyThirtyWithTwoImages: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateSideColumns',
    config: layoutConfigurations.templateSideColumns,
    blocksData: {
      centerMiddle: {
        articles: templateSideColumnsMock
      },
      components: []
    },
    pageId: '',
    articleId: ''
  }
]

export const TemplateSideColumns: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[500px] w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
