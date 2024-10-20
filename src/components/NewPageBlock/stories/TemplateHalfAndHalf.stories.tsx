import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { sampleArticles } from '../mocks/sampleArticles'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/Template5050HeadingAndOneImage',
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
  halfAndHalf: {
    layout: '"col1 col2 col2"',
    columns: [1, 2]
  }
}

const blocksDataHalfAndHalf: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateHalfAndHalf',
    config: layoutConfigurations.halfAndHalf,
    blocksData: {
      centerMiddle: { articles: sampleArticles },
      components: []
    },
    pageId: ''
  }
]

export const T5050HeadingImageDesktop: Story = {
  args: {
    blocksData: blocksDataHalfAndHalf
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[1200px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-2">
          <h1 className="text-3xl">Template5050- Heading + Image - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
          Imagem + Title + Subtitle
          </span>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const T5050HeadingImageMobile: Story = {
  args: {
    blocksData: blocksDataHalfAndHalf
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full p-4">
        <PageBlock {...args} />
      </div>
    </div>
  )
}
