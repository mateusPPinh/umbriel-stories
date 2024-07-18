import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { templateSlot100Featured } from '../mocks/templatesSlot100Featured.mock'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/Slot100-FeaturedRelated-WithoutImage',
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
    'blocksData[0].templateSlot100FeaturedRelatedProps.bgColor': {
      control: 'color'
    },
    'blocksData[0].templateSlot100FeaturedRelatedProps.blockSubject': {
      control: 'text'
    },
    'blocksData[0].templateSlot100FeaturedRelatedProps.blockBorderRadius': {
      control: 'text'
    },
    'blocksData[0].config.layout': { control: 'text' },
    'blocksData[0].config.columns': { control: 'array' }
  },
  args: {
    blocksData: [
      {
        blockType: 'slot',
        blockPosition: '1',
        template: 'TemplateSlot100FeaturedRelated',
        config: { layout: '"container"', columns: [1] },
        blockTitle: '',
        blocksData: {
          centerMiddle: {
            articles: templateSlot100Featured
          },
          components: []
        },
        pageId: '',
        templateSlot100FeaturedRelatedProps: {
          bgColor: '#f5f5f5',
          blockSubject: 'Breaking News',
          blockSubjectColor: '#7159c1',
          articleTitleColor: '',
          blockBorderRadius: ''
        }
      }
    ]
  }
}

export default meta

type Story = StoryObj<typeof PageBlock>

export const FeaturedRelatedDesktop: Story = {
  args: {
    blocksData: [
      {
        blockType: 'slot',
        blockPosition: '1',
        template: 'TemplateSlot100FeaturedRelated',
        config: { layout: '"container"', columns: [1] },
        blockTitle: '',
        blocksData: {
          centerMiddle: {
            articles: templateSlot100Featured
          },
          components: []
        },
        pageId: '',
        templateSlot100FeaturedRelatedProps: {
          bgColor: '#202323',
          blockSubject: 'Slot100FeaturedRelated Desktop',
          blockSubjectColor: '#f1f1f1',
          articleTitleColor: '#ffff',
          blockBorderRadius: '4px'
        }
      }
    ]
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
          <h1 className="text-3xl">Template-Slot100 - Desktop</h1>
          <span className="text-[16px] text-gray-400 mt-2 mb-2 font-bold">
            Imagem + Title + Subtitle
          </span>
          <ul className="text-[16px] text-gray-400 mb-2 font-bold flex flex-col">
            <li>Container:</li>
            <code className="text-black font-normal">max-width:1232px</code>
            <code className="text-black font-normal">min-height: 300px</code>
          </ul>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const FeaturedRelatedMobile: Story = {
  args: {
    blocksData: [
      {
        blockType: 'slot',
        blockPosition: '1',
        template: 'TemplateSlot100FeaturedRelated',
        config: { layout: '"container"', columns: [1] },
        blockTitle: '',
        blocksData: {
          centerMiddle: {
            articles: templateSlot100Featured
          },
          components: []
        },
        pageId: '',
        templateSlot100FeaturedRelatedProps: {
          bgColor: '#3f3f3f',
          blockSubject: 'Slot100FeaturedRelated Mobile',
          blockSubjectColor: '#f1f1f1',
          articleTitleColor: '#ffff',
          blockBorderRadius: '2px'
        }
      }
    ]
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
          <h1 className="text-3xl">Mobile</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
