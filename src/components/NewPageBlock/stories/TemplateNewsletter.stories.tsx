import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { templateNewsletterMock } from '../mocks/TemplateNewsletter.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/TemplateNewsletter',
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
  templateNewsletter: {
    layout: '"col1 col2 col3"',
    columns: [1, 1, 1]
  }
}

const blocksDataMainWithSidebar: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'TemplateNewsletter',
    config: layoutConfigurations.templateNewsletter,
    blocksData: {
      centerMiddle: {
        articles: templateNewsletterMock
      },
      components: []
    },
    pageId: ''
  }
]

export const TemplateNewsletterDesktop: Story = {
  args: {
    blocksData: blocksDataMainWithSidebar
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[400px] w-full p-4">
      <div className="flex mb-8 flex-col items-start ml-0">
          <h1 className="text-2xl">Template Newletter Desktop</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}

export const TemplateNewsletterMobile: Story = {
  args: {
    blocksData: blocksDataMainWithSidebar
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex'
    }
  },
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full p-4">
      <div className="flex mb-8 flex-col items-start">
      <h1 className="text-2xl">Template Newletter Mobile</h1>
        </div>
        <PageBlock {...args} />
      </div>
    </div>
  )
}
