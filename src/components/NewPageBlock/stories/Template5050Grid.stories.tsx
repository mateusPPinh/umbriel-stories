import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { sampleArticles } from '../mocks/sampleArticles'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/Template5050Grid',
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

const layoutConfiguration = {
  grid5050: {
    layout: '"col1 col2"',
    columns: [1, 1]
  }
}

const blocksDataFullWidth: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'Template5050Grid',
    config: layoutConfiguration.grid5050,
    blocksData: {
      centerMiddle: {
        articles: sampleArticles
      },
      components: []
    },
    pageId: ''
  }
]

export const Template5050GridDesktop: Story = {
  args: {
    blocksData: blocksDataFullWidth
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[900px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Template5050 Grid - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
            Imagem + Title + Subtitle
          </span>

        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const Template5050GridMobile: Story = {
  args: {
    blocksData: blocksDataFullWidth
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex' // Definindo a viewport para 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[500px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Template5050 Grid - Mobile</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
            Imagem + Title + Subtitle
          </span>

        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
