import type { Meta, StoryObj } from '@storybook/react'

import Image from './Image'
import Box from '../Boxes/Boxes'

const meta: Meta<typeof Image> = {
  title: 'Componentes/Image',
  component: Image
}

export default meta
type Story = StoryObj<typeof Image>

export const Primary: Story = {
  args: {
    mobile_image_path: 'https://images.unsplash.com/photo-1579762714453-51d9913984e2?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    desktop_image_path: 'https://images.unsplash.com/photo-1579762714453-51d9913984e2?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Minha Imagem',
    customCss: {
      width: 600,
      borderRadius: 10
    }
  },
  decorators: [
    (Story) => {
      return (
        <Box css={{ bgColor: 'neutral900' }}>
          <Story />
        </Box>
      )
    }
  ]
}
