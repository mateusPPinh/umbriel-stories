import { type Meta, type StoryObj } from '@storybook/react'

import Template100 from './Template100'

const meta: Meta<typeof Template100> = {
  title: 'Components/Template100',
  component: Template100
}

export default meta
type Story = StoryObj<typeof Template100>

export const Primary: Story = {
  args: {
    bgColor: 'neutral500',
    genericCarrousel: [{ /* Dados do carrossel aqui */ }],
    genericFooter: [{ footer: { title_bottom: 'Teste', title_top: 'Teste 2' } }],
    genericMenu: [{ title: 'Home', href: '/' }],
    template: 'Template100',
    transparent: false,
    children: <p>Conteúdo adicional que será renderizado</p>
  },
  render: (args) => <Template100 {...args} />
}
