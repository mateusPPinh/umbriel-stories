import type { Meta, StoryObj } from '@storybook/react'

import Button from './index'

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Text to be displayed inside the button'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'underline'],
      description: 'The variant of the button'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Adicionar imagem principal',
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Umbriel gray button',
    variant: 'secondary'
  }
}

export const Success: Story = {
  args: {
    children: 'Umbriel green button',
    variant: 'success'
  }
}

export const Warning: Story = {
  args: {
    children: 'Umbriel yellow button',
    variant: 'warning'
  }
}

export const Danger: Story = {
  args: {
    children: 'Umbriel red button',
    variant: 'danger'
  }
}

export const Info: Story = {
  args: {
    children: 'Umbriel like blue button',
    variant: 'info'
  }
}

export const Light: Story = {
  args: {
    children: 'Salvar Rascunho',
    variant: 'light'
  }
}

export const Dark: Story = {
  args: {
    children: 'Umbriel gray dark button',
    variant: 'dark'
  }
}

export const Underline: Story = {
  args: {
    children: 'Visualizar Página',
    variant: 'underline'
  }
}

export const AllButtons: Story = {
  render: (args) => (
    <div className='space-y-6 space-x-4'>
      <Button {...args} variant="primary">Adicionar imagem principal</Button>
      <Button {...args} variant="secondary">Umbriel gray button</Button>
      <Button {...args} variant="success">Umbriel green button</Button>
      <Button {...args} variant="warning">Umbriel yellow button</Button>
      <Button {...args} variant="danger">Umbriel red button</Button>
      <Button {...args} variant="info">Umbriel like blue button</Button>
      <Button {...args} variant="light">Salvar Rascunho</Button>
      <Button {...args} variant="dark">Umbriel gray dark button</Button>
      <Button {...args} variant="underline">Visualizar Página</Button>
    </div>
  )
}
