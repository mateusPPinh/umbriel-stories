import type { Meta, StoryObj } from '@storybook/react'
import PageBlock from '../index'
import { type BlockData } from '../PageBlock.types'
import { template3070VariationMock } from '../mocks/template3070Variation.mock'

const meta: Meta<typeof PageBlock> = {
  title: 'Components/T3070Variation',
  component: PageBlock,
  argTypes: {
    // Layout
    'blocksData[0].config.layout': {
      control: 'text',
    },
    'blocksData[0].config.columns': {
      control: 'array',
    },

    // Artigos nas posições
    'blocksData[0].articlesLayout.column': {
      control: 'array',
      description:
        'Defina os artigos que ocuparão a coluna principal (Column). Ex: ["slug1", "slug2", "slug3"]',
    },
    'blocksData[0].articlesLayout.sideColumn': {
      control: 'text',
      description: 'Defina o artigo que ocupará a Side Column. Ex: "slug1"',
    },
    'blocksData[0].articlesLayout.articleRows': {
      control: 'array',
      description:
        'Defina os artigos que ocuparão as Article Rows. Ex: ["slug1", "slug2", "slug3"]',
    },
    isDarkMode: {
      control: 'boolean',
      description: 'Ativa ou desativa o modo escuro para o componente.',
      defaultValue: false,
    },

    // columnCSSProps
    'columnCSSProps.titleColor': {
      control: 'color',
      description: 'Cor do título (Title) na coluna.',
      defaultValue: '#000000',
    },
    'columnCSSProps.subtitleColor': {
      control: 'color',
      description: 'Cor do subtítulo (Subtitle) na coluna.',
      defaultValue: '#5a5a5a',
    },
    'rowColumnCSSProps.titleColor': {
      control: 'color',
      description: 'Cor do título na column row.',
      defaultValue: '#5a5a5a',
    },
  },
}

export default meta

type Story = StoryObj<typeof PageBlock>

const layoutConfigurations = {
  t3070Variation: {
    layout: '"col1" "divider1" "col2"',
    columns: [1, 1],
  },
}

const blocksDataSeventyThirtyWithTwoImages: BlockData[] = [
  {
    blockType: 'slot',
    blockPosition: '1',
    template: 'T3070Variation',
    config: layoutConfigurations.t3070Variation,
    blocksData: {
      centerMiddle: {
        articles: template3070VariationMock, // Mock de artigos
      },
      components: [],
    },
    pageId: '',
    articleId: '',
    articlesPerRow: 3,
    articlesLayout: {
      column: [
        'the-los-angeles-fire',
        'not-a-lorem-ipsum-whatsoever-but-your-lorem-ipsum!',
        'policia-prende-pm-suspeito-de-dirigir-carro-usado-na-execucao-de-delator-do-pcc-no-aeroporto',
      ], // Aqui você pode alterar os slugs
      sideColumn: 'the-los-angeles-fire',
      articleRows: [
        'policia-prende-pm-suspeito-de-dirigir-carro-usado-na-execucao-de-delator-do-pcc-no-aeroporto',
        'os-acontecimentos-"estranhos"-da-noite-de-20-de-abril-de-1992',
        'tiktok-rednote-and-the-crushed-promise-of-the-chinese-internet',
        'the-los-angeles-fire',
        'not-a-lorem-ipsum-whatsoever-but-your-lorem-ipsum!',
        'tiktok-rednote-and-the-crushed-promise-of-the-chinese-internet',
      ],
    },
  },
]

export const T3070Variation: Story = {
  args: {
    blocksData: blocksDataSeventyThirtyWithTwoImages,
    isDarkMode: false,
    rowColumnBorderTopColor: '#aaaa',
    columnCSSProps: {
      subtitleColor: '#5a5a5a', // Valor inicial para o subtitleColor
      titleColor: '#000000', // Valor inicial para o titleColor
    },
    rowColumnCSSProps: {
      titleColor: '#f3f3f3',
    },
  },
  render: (args) => (
    <div
      className={`flex items-center justify-center w-screen ${
        args.isDarkMode ? 'bg-[#000]' : 'bg-[#fff]'
      }`}
    >
      <div className="w-full max-w-[1238px] p-4">
        <PageBlock {...args} />
      </div>
    </div>
  ),
}
