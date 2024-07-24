/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Meta, StoryObj } from '@storybook/react'
import Topbar from './index'
import Button from '../Button'
import umbrieltextLogo from '../../../public/umbriel-text-logo.svg'

const meta: Meta<typeof Topbar> = {
  title: 'Componentes/Topbar',
  component: Topbar,
  argTypes: {
    topbarBgColor: {
      control: { type: 'color' },
      description: 'Background color of the topbar',
    },
    variant: {
      control: { type: 'select' },
      options: ['topbarArticle', 'topbarDefault'],
      description: 'Variant of the topbar',
    },
    items: {
      control: { type: 'object' },
      description:
        'Array of items with label, onClick handler, and icon options',
      defaultValue: [
        {
          label: 'Nova matéria',
          onClick: () => {
            console.log('Go back')
          },
          hasIcon: { isGobackIcon: true, isNextIcon: false },
        },
        {
          label: 'Próxima',
          onClick: () => {
            console.log('Next')
          },
          hasIcon: { isGobackIcon: false, isNextIcon: true },
        },
      ],
    },
    topbarDescriptionChild: {
      control: { type: 'object' },
      description: 'Child elements displayed on the right side of the topbar',
      defaultValue: (
        <>
          <Button
            className="hover:opacity-70 transition-opacity"
            variant="underline"
          >
            Visualizar página
          </Button>
          <Button
            className="hover:opacity-70 transition-opacity"
            variant="primary"
          >
            Salvar rascunho
          </Button>
          <Button
            className="hover:opacity-70 transition-opacity"
            variant="secondary"
          >
            Publicar
          </Button>
        </>
      ),
    },
  },
}

export default meta
type Story = StoryObj<typeof Topbar>

export const ArticleTopBar: Story = {
  args: {
    topbarBgColor: '#FAFAFA',
    variant: 'topbarArticle',
    items: [
      {
        label: 'Nova matéria',
        onClick: () => {
          console.log('Go back')
        },
        hasIcon: { isGobackIcon: true, isNextIcon: false },
      },
      {
        label: 'Próxima',
        onClick: () => {
          console.log('Next')
        },
        hasIcon: { isGobackIcon: false, isNextIcon: true },
      },
    ],
    topbarDescriptionChild: (
      <>
        <Button
          className="hover:opacity-70 transition-opacity"
          variant="underline"
        >
          Visualizar página
        </Button>
        <Button
          className="hover:opacity-70 transition-opacity"
          variant="primary"
        >
          Salvar rascunho
        </Button>
        <Button
          className="hover:opacity-70 transition-opacity"
          variant="secondary"
        >
          Publicar
        </Button>
      </>
    ),
  },
  decorators: [
    (Story, context) => {
      return (
        <div className="flex items-center w-screen flex-col p-4">
          <h1 className="font-heading text-3xl mb-4 mr-auto">
            Article Topbar{' '}
          </h1>
          <Story {...context.args} />
        </div>
      )
    },
  ],
}

export const DefaultTopBar: Story = {
  args: {
    topbarBgColor: '#FAFAFA',
    variant: 'topbarDefault',
    logo: <img src={umbrieltextLogo} alt="Umbriel Logo" />,
    onLogoClick: () => {
      alert('Logo clicked')
    },
    centralContent: (
      <div>
        <p>Child component must be here</p>
      </div>
    ),
    items: [
      {
        label: 'Nova matéria',
        onClick: () => {
          console.log('Go back')
        },
        hasIcon: { isGobackIcon: true, isNextIcon: false },
      },
      {
        label: 'Próxima',
        onClick: () => {
          console.log('Next')
        },
        hasIcon: { isGobackIcon: false, isNextIcon: false },
      },
    ],
    topbarDescriptionChild: (
      <>
        <Button
          className="hover:opacity-70 transition-opacity"
          variant="underline"
        >
          Visualizar página
        </Button>
        <Button
          className="hover:opacity-70 transition-opacity"
          variant="primary"
        >
          Salvar rascunho
        </Button>
        <Button
          className="hover:opacity-70 transition-opacity"
          variant="secondary"
        >
          Publicar
        </Button>
      </>
    ),
  },
  decorators: [
    (Story, context) => {
      return (
        <div className="flex items-center w-screen flex-col p-4">
          <h1 className="font-heading text-3xl mb-4 mr-auto">Default Topbar</h1>
          <Story {...context.args} />
        </div>
      )
    },
  ],
}
