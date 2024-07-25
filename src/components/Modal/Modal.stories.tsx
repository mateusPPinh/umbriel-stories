/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Meta, StoryObj } from '@storybook/react'
import Button from '../Button'

import Modal from './index'
import BlockItemCards from '../BlockItemCards'
import imageBlockFullWidth from '../../../public/image-block-fullwidth.svg'
import textBlockFullWidth from '../../../public/text-block-fullwidth.svg'
import imageBlockText from '../../../public/image-block-text-block-1:2-width.svg'
import textBlockImage from '../../../public/text-block-image-block-1:2-width.svg'
import imageBlockOnly from '../../../public/image-block-image-block-1:2-width.svg'
import nextProjectFullWidth from '../../../public/next-project-fullwidth.svg'
import { useState } from 'react'

const dialogTriggerChild = () => {
  return (
    <Button variant="primary" className="hover:opacity-80 transition-opacity">
      Open add block modal
    </Button>
  )
}

const defaultBlocks = [
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

const meta: Meta<typeof Modal> = {
  title: 'Componentes/Modal',
  component: Modal,
  argTypes: {
    modalContent: {
      control: { type: 'object' },
      description: 'React Element to be displayed as the content of the modal',
      table: {
        type: { summary: 'ReactElement' },
        defaultValue: { summary: '' },
      },
    },
    modalTitle: { control: 'text' },
    modalSubtitle: { control: 'text' },
    useCustomCloseButton: { control: 'boolean' },
    dialogTriggerChild: {
      control: { type: 'object' },
      description: 'React Element to be displayed as the trigger of the modal',
      table: {
        type: { summary: 'ReactElement' },
        defaultValue: { summary: '' },
      },
    },
    open: { control: 'boolean' },
    onOpenChange: { action: 'opened/closed' },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const AddBlockModal: Story = {
  args: {
    modalContent: (
      <BlockItemCards
        blocks={defaultBlocks}
        onCardSelect={(cardType) => {
          console.log(`Selected card: ${cardType}`)
        }}
      />
    ),
    modalTitle: 'Adicionar Bloco',
    modalSubtitle: '',
    useCustomCloseButton: false,
    dialogTriggerChild: dialogTriggerChild(),
    open: true,
  },
  decorators: [
    (Story, context) => {
      const [open, setOpen] = useState(context.args.open)

      return (
        <div className="flex items-center justify-center h-screen w-screen">
          <Story {...context.args} open={open} onOpenChange={setOpen} />
        </div>
      )
    },
  ],
}
