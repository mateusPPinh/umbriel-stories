import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { sampleArticles } from '../mocks/sampleArticles'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/Template7030(Title-Subtitle-Imagem)',
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
  seventyThirty: {
    layout: '"col1 col1 col2"',
    columns: [2, 1]
  }
}

const blocksDataSeventyThirty: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateSeventyThirty',
    config: layoutConfigurations.seventyThirty,
    blocksData: {
      centerMiddle: {
        articles: sampleArticles
      },
      components: []
    },
    pageId: '',
    articleId: ''
  }
]

export const Template7030: Story = {
  args: {
    blocksData: blocksDataSeventyThirty
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[800px] w-full p-4">
       <div className='flex mb-8 flex-col items-start ml-2'>
        <h1 className='text-3xl'>Template7030</h1>
          <span className='text-[16px] text-gray-400 mt-2 mb-2 font-bold'>Título + Subtítulo 70% - A esquerda</span>
          <span className='text-[16px] text-gray-400 mb-2 font-bold'>Uma imagem - 30% a direita</span>
       </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
