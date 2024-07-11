import type { Meta, StoryObj } from '@storybook/react'

import SideMenu from './index'

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu
}

export default meta
type Story = StoryObj<typeof SideMenu>

export const Primary: Story = {
  args: {
    menu: [
      {
        title: 'ESTATÍSTICAS',
        items: [{ label: 'Painel', onClick: () => { alert('Navegando para Painel') } }]
      },
      {
        title: 'CONTEÚDO',
        items: [
          { label: 'Matérias', onClick: () => { alert('Navegando para Matérias') } },
          { label: 'Editorias', onClick: () => { alert('Navegando para Editorias') } },
          { label: 'Páginas', onClick: () => { alert('Navegando para Páginas') } }
        ]
      },
      {
        title: 'CONFIGURAÇÕES',
        items: [
          { label: 'Tema do Site', onClick: () => { alert('Navegando para Tema do Site') } },
          { label: 'Componentes', onClick: () => { alert('Navegando para Componentes') } },
          { label: 'Usuários e Permissões', onClick: () => { alert('Navegando para Usuários e Permissões') } }
        ]
      }
    ]
  },
  decorators: [
    (Story, context) => {
      return (
        <>
          <Story {...context.args} />
        </>
      )
    }
  ]
}
