import { type Meta, type StoryObj } from '@storybook/react'

import Template100 from './Template100'

const meta: Meta<typeof Template100> = {
  title: 'Components/Template100',
  component: Template100
}

export default meta
type Story = StoryObj<typeof Template100>

export const PrimaryFooter: Story = {
  args: {
    bgColor: 'neutral500',
    genericFooter: [
      { footer: { title_bottom: 'Teste Renderização', title_top: 'Teste 2' } }
    ],
    template: 'Template100',
    transparent: false
  },
  render: (args) => <Template100 {...args} />
}

export const PrimaryMenu: Story = {
  args: {
    bgColor: 'neutral500',
    genericMenu: [
      { title: 'Home', href: '/' },
      { title: 'Home', href: '/' },
      { title: 'Home', href: '/' }
    ],
    template: 'Template100',
    transparent: false,
    children: ''
  },
  render: (args) => <Template100 {...args} />
}
