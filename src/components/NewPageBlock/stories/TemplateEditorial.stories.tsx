import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { PageBlockProps, type BlockData } from '../PageBlock.types'
import { editorialTemplateMock } from '../mocks/editorialTemplate'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/EditorialTemplate',
  component: PageBlock,
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    'blocksData[0].config.layout': {
      control: 'text',
    },
    'blocksData[0].config.columns': {
      control: 'array',
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof PageBlock>

const layoutConfigurations = {
  templateEditorial: {
    layout: '"col1" "col2"',
    columns: [1, 1],
  },
}

const blocksDataSeventyThirtyWithTwoImages: BlockData[] | PageBlockProps = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'EditorialTemplate',
    config: layoutConfigurations.templateEditorial,
    blocksData: {
      centerMiddle: {
        articles: editorialTemplateMock,
      },
      components: [],
    },
    pageId: '',
    articleId: '',
  },
]

export const EditorialTemplate: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages,
    loading: false, // Adicionando a prop loading
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full max-w-[1200px] p-4">
        <PageBlock {...args} />
      </div>
    </div>
  ),
}

export const LoadingEditorialTemplate: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages,
    loading: true, // Simulando estado de carregamento com skeleton
  },
  render: (args) => (
    <div className="flex items-center justify-center w-screen">
      <div className="w-full max-w-[1200px] p-4">
        <PageBlock {...args} />
      </div>
    </div>
  ),
}
