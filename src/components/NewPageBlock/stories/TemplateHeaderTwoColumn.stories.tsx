import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { custom50Article } from '../mocks/custom50'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateHeaderTwoColumn',
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
  halfAndHalfWithImage: {
    layout: '"col1 col2"',
    columns: [1, 1]
  }
}

const blocksData5050: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'Template5050',
    config: layoutConfigurations.halfAndHalfWithImage,
    blocksData: {
      centerMiddle: { articles: custom50Article },
      components: []
    },
    pageId: '',
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
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">T5050 - 2 columns - 2 rows without subtitle + editorial teaser- Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
          Title + Image
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
