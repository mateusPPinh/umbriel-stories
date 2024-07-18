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

const dialogTriggerChild = () => {
  return <Button variant="primary" className='hover:opacity-80 transition-opacity'>Open add block modal</Button>
}

const defaultBlocks = [
  {
    title: 'Bloco de imagem',
    description: 'Largura: 100% da tela',
    img: imageBlockFullWidth
  },
  {
    title: 'Bloco de texto',
    description: 'Largura: 100% da tela',
    img: textBlockFullWidth
  },
  {
    title: 'Bloco de imagem + texto',
    description: 'Largura: 50% + 50% da tela',
    img: imageBlockText
  },
  {
    title: 'Bloco de texto + imagem',
    description: 'Largura: 50% + 50% da tela',
    img: textBlockImage
  },
  {
    title: 'Bloco de imagem + imagem',
    description: 'Largura: 50% + 50% da tela',
    img: imageBlockOnly
  },
  {
    title: 'Bloco de próximo projeto',
    description: 'Largura: 100% da tela',
    img: nextProjectFullWidth
  }
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
        defaultValue: { summary: '' }
      }
    },
    modalTitle: { control: 'text' },
    modalSubtitle: { control: 'text' },
    useCustomCloseButton: { control: 'boolean' },
    dialogTriggerChild: {
      control: { type: 'object' },
      description: 'React Element to be displayed as the trigger of the modal',
      table: {
        type: { summary: 'ReactElement' },
        defaultValue: { summary: '' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Modal>

export const AddBlockModal: Story = {
  args: {
    modalContent: <BlockItemCards blocks={defaultBlocks} />,
    modalTitle: 'Adicionar Bloco',
    modalSubtitle: '',
    useCustomCloseButton: false,
    dialogTriggerChild: dialogTriggerChild()
  },
  decorators: [
    (Story, context) => {
      return (
        <div className="flex items-center justify-center h-screen w-screen">
          <Story {...context.args} />
        </div>
      )
    }
  ]
}
