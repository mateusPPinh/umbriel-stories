import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { sampleArticles } from '../mocks/sampleArticles'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/T5050TwoColumnsTwoRows',
  component: PageBlock,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'desktop'
    }
  },
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
  custom5050: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  }
}

const blocksDataCustom5050: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'Template5050',
    config: layoutConfigurations.custom5050,
    blocksData: {
      centerMiddle: { articles: sampleArticles },
      components: []
    },
    pageId: ''
  }
]

export const T5050TwoColumnsTwoRows: Story = {
  args: {
    blocksData: blocksDataCustom5050
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="max-w-[1200px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">T5050 - 2 colunas - 2 rows</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
