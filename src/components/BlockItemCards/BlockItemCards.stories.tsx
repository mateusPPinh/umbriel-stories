import type { Meta, StoryObj } from '@storybook/react'

import BlockItemCards from '../BlockItemCards'
import imageBlockFullWidth from '../../../public/image-block-fullwidth.svg'
import textBlockFullWidth from '../../../public/text-block-fullwidth.svg'
import imageBlockText from '../../../public/image-block-text-block-1:2-width.svg'
import textBlockImage from '../../../public/text-block-image-block-1:2-width.svg'
import imageBlockOnly from '../../../public/image-block-image-block-1:2-width.svg'
import nextProjectFullWidth from '../../../public/next-project-fullwidth.svg'
import { type BlockItemCardsProps } from './types'

const defaultBlocks: BlockItemCardsProps['blocks'] = [
  {
    title: 'Bloco de imagem',
    description: 'Largura: 100% da tela',
    img: imageBlockFullWidth,
    onClick: () => {
      console.log('Bloco de imagem')
    },
  },
  {
    title: 'Bloco de texto',
    description: 'Largura: 100% da tela',
    img: textBlockFullWidth,
    onClick: () => {
      console.log('Bloco de Texto')
    },
  },
  {
    title: 'Bloco de imagem + texto',
    description: 'Largura: 50% + 50% da tela',
    img: imageBlockText,
    onClick: () => {
      console.log('Bloco de imagem + texto')
    },
  },
  {
    title: 'Bloco de texto + imagem',
    description: 'Largura: 50% + 50% da tela',
    img: textBlockImage,
    onClick: () => {
      console.log('Bloco de texto + imagem')
    },
  },
  {
    title: 'Bloco de imagem + imagem',
    description: 'Largura: 50% + 50% da tela',
    img: imageBlockOnly,
    onClick: () => {
      console.log('Bloco de imagem + imagem')
    },
  },
  {
    title: 'Bloco de próximo projeto',
    description: 'Largura: 100% da tela',
    img: nextProjectFullWidth,
    onClick: () => {
      console.log('Bloco de próximo projeto')
    },
  },
]

const meta: Meta<typeof BlockItemCards> = {
  title: 'Componentes/BlockItemCards',
  component: BlockItemCards,
  argTypes: {
    blocks: {
      control: { type: 'object' },
      description: 'Array of block items to be displayed',
      table: {
        type: { summary: 'Array of blocks' },
      },
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    'blocks.title': {
      control: { type: 'text' },
      description: 'Title of the block',
      table: {
        type: { summary: 'string' },
      },
    },
    'blocks.description': {
      control: { type: 'text' },
      description: 'Description of the block',
      table: {
        type: { summary: 'string' },
      },
    },
    'blocks.img': {
      control: { type: 'text' },
      description: 'Image URL of the block',
      table: {
        type: { summary: 'string' },
      },
    },
    onCardSelect: {
      action: 'card selected',
      description: 'Function to handle card selection',
      table: {
        type: { summary: '(cardType: string) => void' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BlockItemCards>

export const Primary: Story = {
  args: {
    blocks: defaultBlocks,
    onCardSelect: (cardType) => {
      console.log(`Selected card: ${cardType}`)
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <div className="flex items-center justify-center h-screen w-screen">
          <Story {...context.args} />
        </div>
      )
    },
  ],
}
