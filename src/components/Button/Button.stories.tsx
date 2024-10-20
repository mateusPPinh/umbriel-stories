import type { Meta, StoryObj } from '@storybook/react'

import Button from './index'

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Text to be displayed inside the button',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark',
        'underline',
        'rounded',
      ],
      description: 'The variant of the button',
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description:
        'Whether the button should take the full width of its container',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled button state',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'loading button state',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

const Template: Story = {
  render: (args) => (
    <div className="flex items-center flex-col justify-center h-screen w-screen">
      <h1 className="font-heading text-3xl mb-2">Buttons</h1>
      <Button {...args} />
    </div>
  ),
}

export const Primary: Story = {
  ...Template,
  args: {
    children: 'Adicionar imagem principal',
    variant: 'primary',
    isFullWidth: false,
  },
}

export const Secondary: Story = {
  ...Template,
  args: {
    children: 'Umbriel gray button',
    variant: 'secondary',
    isFullWidth: false,
  },
}

export const Success: Story = {
  ...Template,
  args: {
    children: 'Umbriel green button',
    variant: 'success',
    isFullWidth: false,
    className: '',
  },
}

export const Warning: Story = {
  ...Template,
  args: {
    children: 'Umbriel yellow button',
    variant: 'warning',
    isFullWidth: false,
  },
}

export const Danger: Story = {
  ...Template,
  args: {
    children: 'Umbriel red button',
    variant: 'danger',
    isFullWidth: false,
  },
}

export const Info: Story = {
  ...Template,
  args: {
    children: 'Umbriel like blue button',
    variant: 'info',
    isFullWidth: false,
    className: 'hover:opacity-70 transtion:hover',
  },
}

export const Light: Story = {
  ...Template,
  args: {
    children: 'Salvar Rascunho',
    variant: 'light',
    isFullWidth: false,
  },
}

export const Dark: Story = {
  ...Template,
  args: {
    children: 'Umbriel gray dark button',
    variant: 'dark',
    isFullWidth: false,
  },
}

export const Underline: Story = {
  ...Template,
  args: {
    children: 'Visualizar Página',
    variant: 'underline',
    isFullWidth: false,
  },
}

export const Rounded: Story = {
  ...Template,
  args: {
    children: 'Adicionar Prêmio',
    variant: 'rounded',
    isFullWidth: false,
  },
}

export const AllButtons: Story = {
  render: (args) => (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[1200px] grid grid-cols-3 gap-6">
        <Button {...args} variant="primary">
          Adicionar imagem principal
        </Button>
        <Button
          {...args}
          variant="secondary"
          className="hover:opacity-85 transition-opacity"
        >
          Umbriel gray button
        </Button>
        <Button
          {...args}
          variant="success"
          className="hover:opacity-85 transition-opacity"
        >
          Umbriel green button
        </Button>
        <Button
          {...args}
          variant="warning"
          className="hover:opacity-85 transition-opacity"
        >
          Umbriel yellow button
        </Button>
        <Button
          {...args}
          variant="danger"
          className="hover:opacity-85 transition-opacity"
        >
          Umbriel red button
        </Button>
        <Button
          {...args}
          variant="info"
          className="hover:opacity-85 transition-opacity"
        >
          Umbriel like blue button
        </Button>
        <Button
          {...args}
          variant="light"
          className="hover:opacity-85 transition-opacity"
        >
          Salvar Rascunho
        </Button>
        <Button
          {...args}
          variant="dark"
          className="hover:opacity-85 transition-opacity"
        >
          Umbriel gray dark button
        </Button>
        <Button
          {...args}
          variant="underline"
          className="hover:opacity-85 transition-opacity"
        >
          Visualizar Página
        </Button>
        <Button
          {...args}
          variant="rounded"
          className="hover:opacity-85 transition-opacity"
        >
          Adicionar prêmio
        </Button>
      </div>
    </div>
  ),
}
