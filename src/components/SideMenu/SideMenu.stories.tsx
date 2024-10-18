import type { Meta, StoryObj } from '@storybook/react'

import SideMenu from './index'

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
}

export default meta
type Story = StoryObj<typeof SideMenu>

export const Primary: Story = {
  args: {
    menu: [
      {
        title: 'ESTATÍSTICAS',
        items: [
          {
            label: 'Painel',
            onClick: () => {
              console.log('Navegando para Painel')
            },
            childrenUniqueId: 'panel_identity',
          },
        ],
      },
      {
        title: 'CONTEÚDO',
        items: [
          {
            label: 'Matérias',
            onClick: () => {
              alert('Navegando para Matérias')
            },
            childrenUniqueId: 'articles_identity',
          },
          {
            label: 'Editorias',
            onClick: () => {
              alert('Navegando para Editorias')
            },
            children: [
              {
                label: 'Esportes',
                onClick: () => {
                  alert('Navegando para Esportes')
                },
              },
              {
                label: 'Política',
                onClick: () => {
                  alert('Navegando para Política')
                },
              },
              {
                label: 'Projetos',
                onClick: () => {
                  alert('Navegando para Política')
                },
              },
            ],
            childrenUniqueId: 'editorials_identity',
          },
          {
            label: 'Site',
            onClick: () => {
              alert('Navegando para Editorias')
            },
            children: [
              {
                label: 'Configurações gerais',
                onClick: () => {
                  alert('Navegando para Esportes')
                },
              },
              {
                label: 'Guia de estilos',
                onClick: () => {
                  alert('Navegando para Política')
                },
              },
              {
                label: 'Componentes',
                onClick: () => {
                  alert('Navegando para Política')
                },
              },
              {
                label: 'Usuários e Permissões',
                onClick: () => {
                  alert('Navegando para Usuários e Permissões')
                },
              },
            ],
            childrenUniqueId: 'site_identity',
          },
          {
            label: 'Páginas',
            onClick: () => {
              alert('Navegando para Páginas')
            },
            childrenUniqueId: 'pages_identity',
          },
        ],
      },
      {
        title: 'CONFIGURAÇÕES DO UMBRIEL',
        items: [
          {
            label: 'Blocos',
            onClick: () => {
              alert('Navegando para Editorias')
            },
            children: [
              {
                label: 'Configurações gerais',
                onClick: () => {
                  alert('Navegando para Esportes')
                },
              },
              {
                label: 'Guia de estilos',
                onClick: () => {
                  alert('Navegando para Política')
                },
              },
              {
                label: 'Componentes',
                onClick: () => {
                  alert('Navegando para Política')
                },
              },
              {
                label: 'Usuários e Permissões',
                onClick: () => {
                  alert('Navegando para Usuários e Permissões')
                },
              },
            ],
            childrenUniqueId: 'umbriel_settings_identity',
          },
        ],
      },
    ],
    hiddeSideMenu: true,
  },
  decorators: [
    (Story, context) => {
      return (
        <>
          <Story {...context.args} />
        </>
      )
    },
  ],
}
