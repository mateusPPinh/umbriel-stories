# @umbriel/components

A comprehensive React component library built with TypeScript, Storybook, and modern web technologies.

## 🚀 Tech Stack

- **Framework:** React (^17.0.0 || ^18.0.0)
- **Language:** TypeScript
- **Styling:**
  - Tailwind CSS
  - Styled Components (^6.0.0)
- **Development Environment:**
  - Vite
  - Rollup
  - Storybook 7
- **Testing:** Storybook Test

## 📦 Installation

```bash
npm install @umbriel/components
# or
yarn add @umbriel/components
```

## 🔧 Dependencies

### Core Dependencies

- React & React DOM (^17.0.0 || ^18.0.0)
- Styled Components (^6.0.0)

### UI Components & Libraries

- Radix UI (@radix-ui/react-dialog)
- Embla Carousel (embla-carousel-react, embla-carousel-autoplay)
- Lucide React Icons
- React Photo Album
- Yet Another React Lightbox

### Development Dependencies

- TypeScript
- ESLint with multiple plugins
- Prettier
- Tailwind CSS
- PostCSS
- Storybook with various addons

## 🏗️ Project Structure

```
src/
├── assets/         # Static assets
├── components/     # React components
├── fonts/         # Font files
├── lib/           # Utility functions and helpers
├── styles/        # Global styles and theme configurations
└── tests/         # Test files
```

## 📚 Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build the library using Rollup
- `yarn prepare`: Run build before publishing
- `yarn lint`: Run ESLint
- `yarn storybook`: Start Storybook development server
- `yarn build-storybook`: Build Storybook for production
- `yarn format`: Format code using Prettier

## 🎨 Features

- Modern React component library
- TypeScript support
- Storybook integration for component documentation
- Tailwind CSS integration
- Theme customization support
- Responsive design components
- Image gallery and lightbox components
- Carousel components
- Dialog/Modal components

## 🛠️ Development

### Building

The project uses Rollup for building the library with the following configurations:

- TypeScript support
- PostCSS processing
- CommonJS and ES Module output
- DTS generation for TypeScript types
- Terser for code minification

### Styling

The project combines multiple styling approaches:

- Tailwind CSS for utility-first styling
- Styled Components for component-specific styling
- Class Variance Authority for component variants
- Tailwind Merge for class name conflicts resolution

### Component Development

Components are developed with:

- TypeScript for type safety
- Storybook for development and documentation
- React 17/18 compatibility
- Responsive design principles
- Accessibility considerations

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

# BlockManagerDragDrop

Um componente React avançado para gerenciamento de layouts de artigos em um CMS, permitindo a criação e configuração de diferentes tipos de blocos de conteúdo com suporte a drag-and-drop.

## Visão Geral

O BlockManagerDragDrop é um componente de biblioteca que fornece uma interface completa para gerenciar diferentes tipos de layouts de artigos, incluindo:

- **Grid**: Layouts em grade com diferentes variantes (standard, featured, masonry, sidebargrid, newsfeed, newsgrid)
- **List**: Layouts em lista com diferentes variantes (chronological, compact, card)
- **Mixed**: Layouts mistos com diferentes variantes (sidebar, showcase, newspaper, magazine, videogrid)
- **Featured**: Layouts de destaque com diferentes variantes (hero, split, triple)

Cada tipo de layout possui suas próprias configurações e variantes, permitindo uma grande flexibilidade na apresentação de conteúdo.

## Características Principais

- **Drag-and-Drop**: Interface intuitiva para arrastar e soltar artigos entre colunas
- **Configuração de Estilos**: Modal para configuração detalhada de estilos, incluindo temas claro/escuro
- **Configuração de Mídia**: Opções para configurar como imagens e vídeos são exibidos
- **Configurações por Coluna**: Controle granular sobre quais elementos são exibidos em cada coluna
- **Modo de Visualização**: Alternância entre modo de edição e visualização completa
- **Responsivo**: Layouts adaptáveis para diferentes tamanhos de tela
- **Lazy Loading**: Carregamento sob demanda de componentes pesados para melhor performance

## Instalação

```bash
npm install @umbriel/storybook
# ou
yarn add @umbriel/storybook
```

## Uso Básico

```jsx
import React from 'react';
import { BlockManagerDragDrop } from '@umbriel/storybook';

const MyComponent = () => {
  const articles = [/* array de artigos */];
  
  const handleSave = (data) => {
    // Enviar dados para a API
    console.log('Dados salvos:', data);
  };
  
  return (
    <BlockManagerDragDrop
      articles={articles}
      blockType="grid"
      isDarkTheme={false}
      onSave={handleSave}
      variant="standard"
      pageId="page-123"
    />
  );
};

export default MyComponent;
```

## Props

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `articles` | `Article[]` | Sim | - | Array de artigos a serem exibidos e gerenciados |
| `blockType` | `'grid' \| 'list' \| 'mixed' \| 'featured'` | Sim | - | Tipo de bloco a ser renderizado |
| `isDarkTheme` | `boolean` | Não | `false` | Define se o tema escuro deve ser aplicado |
| `onSave` | `(data: any) => void` | Sim | - | Função chamada quando o usuário salva as alterações |
| `variant` | `string` | Não | Depende do `blockType` | Variante inicial do layout |
| `pageId` | `string` | Sim | - | ID da página onde o bloco está sendo editado |

## Estrutura de Dados

### Article

```typescript
interface Article {
  id: string | number;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  publishDate?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  category?: {
    name: string;
    slug?: string;
  };
  image?: {
    url: string;
    alt?: string;
  };
  video?: {
    url: string;
    thumbnail?: string;
  };
  slug?: string;
  tags?: string[];
}
```

### Formato de Dados para API

Quando o método `onSave` é chamado, ele recebe um objeto com a seguinte estrutura:

```typescript
{
  pageId: string;
  blockType: 'articles';
  blockPosition: number;
  template: 'grid' | 'list' | 'mixed' | 'featured';
  variants: [
    {
      variantType: string;
      variantPosition: number;
      config: {
        layout: {
          columns: string;
          gap: string;
          styles: {
            width: string;
            backgroundColor: string;
          }
        },
        articles: {
          [columnId: string]: string[]; // IDs dos artigos
        },
        mediaConfig?: {
          // Configurações de mídia
        },
        styles: {
          // Configurações de estilo
        }
      }
    }
  ]
}
```

## Componentes Internos

O BlockManagerDragDrop é composto por vários componentes internos:

- **Managers**: Gerenciam o estado e a lógica de cada tipo de layout
  - `GridManager`
  - `ListManager`
  - `MixedManager`
  - `FeaturedManager`

- **Previews**: Renderizam a visualização de cada tipo de layout
  - `LayoutPreview`
  - `ListLayoutPreview`
  - `MixedLayoutPreview`
  - `FeaturedLayoutPreview`

- **Drag-and-Drop**: Componentes para a funcionalidade de arrastar e soltar
  - `DroppableColumn`
  - `DraggableArticle`
  - `ArticlesPool`

- **Configuração**: Componentes para configuração de estilos e mídia
  - `StyleConfigModal`
  - `MediaConfig`
  - `ThemeConfig`
  - `LayoutConfig`
  - `VariantConfig`

## Hooks

O componente utiliza hooks personalizados para gerenciar o estado:

- **useBlockState**: Gerencia o estado do bloco, incluindo artigos, variantes e configurações

## Fluxo de Trabalho

1. O usuário seleciona um tipo de bloco e uma variante
2. Arrasta artigos do pool para as colunas desejadas
3. Configura os estilos e opções de mídia conforme necessário
4. Visualiza o resultado em tempo real
5. Salva as alterações, que são enviadas para a API através da função `onSave`

## Personalização

O componente pode ser personalizado através das configurações de estilo e mídia. Cada tipo de layout possui suas próprias opções de personalização.

## Integração com API

Para integrar com uma API, implemente a função `onSave` para enviar os dados para o servidor:

```jsx
const handleSave = async (data) => {
  try {
    const response = await fetch('https://api.example.com/blocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Falha ao salvar');
    }
    
    const result = await response.json();
    console.log('Salvo com sucesso:', result);
  } catch (error) {
    console.error('Erro ao salvar:', error);
  }
};
```

## Exemplo de Resposta da API

```json
{
  "success": true,
  "data": {
    "blockId": "block-123",
    "pageId": "page-123",
    "blockType": "articles",
    "template": "grid",
    "updatedAt": "2023-03-01T12:00:00Z"
  }
}
```

## Considerações de Performance

- O componente utiliza lazy loading para carregar componentes pesados apenas quando necessário
- Memoização é aplicada em componentes e funções para evitar renderizações desnecessárias
- O estado é gerenciado de forma eficiente para minimizar atualizações

## Acessibilidade

O componente segue as melhores práticas de acessibilidade, incluindo:

- Contraste adequado entre texto e fundo
- Foco visível em elementos interativos
- Textos alternativos para imagens
- Estrutura semântica

## Compatibilidade com Navegadores

O componente é compatível com os seguintes navegadores:

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)

## Licença

Este componente é parte da biblioteca @umbriel/storybook e está sujeito aos termos de licença da mesma.

# Umbriel Storybook Components

This library contains reusable React components for the Umbriel CMS project.

## Installation

```bash
npm install @umbriel/components
# or
yarn add @umbriel/components
```

## Usage

### BlockManagerDragDrop Component

The `BlockManagerDragDrop` component is a powerful drag-and-drop interface for managing article layouts in different block types and variants.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `articles` | `Article[]` | Array of articles to be used in the block |
| `blockType` | `'grid' \| 'list' \| 'mixed' \| 'featured'` | Type of block layout |
| `isDarkTheme` | `boolean` | Whether to use dark theme styling |
| `onSave` | `(data: any) => void` | Callback function when saving the block |
| `variant` | `string` | Variant of the block layout |
| `pageId` | `string` | ID of the page where the block is located |
| `config` | `BlockConfig` | Configuration for the block styling and layout |
| `className` | `string` | Additional CSS classes to apply to the component |

#### Example

```jsx
import { BlockManagerDragDrop, BlockConfig } from '@umbriel/components';

const MyComponent = () => {
  const articles = [...]; // Your articles data
  
  const handleSave = (data) => {
    console.log('Block data saved:', data);
    // Save to your backend
  };
  
  const defaultConfig = {
    layout: {
      columns: '3',
      gap: '6',
      styles: {
        width: '100%',
        backgroundColor: 'transparent'
      }
    },
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: '#ffffff',
            padding: '1rem'
          },
          headingProps: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#111827'
          },
          subtitleProps: {
            fontSize: '0.875rem',
            color: '#6B7280'
          }
        },
        dark: {
          columnStyle: {
            background: '#1F2937',
            padding: '1rem'
          },
          headingProps: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#F9FAFB'
          },
          subtitleProps: {
            fontSize: '0.875rem',
            color: '#9CA3AF'
          }
        }
      },
      showExcerpt: true,
      showMetadata: true,
      titleSize: 'text-lg'
    }
  };
  
  return (
    <BlockManagerDragDrop
      articles={articles}
      blockType="grid"
      isDarkTheme={false}
      onSave={handleSave}
      variant="standard"
      pageId="page-123"
      config={defaultConfig}
      className="w-full"
    />
  );
};
```

## Available Components

- `BlockManagerDragDrop`: Main component for managing article layouts
- `ListManager`: Component for managing list layouts
- `GridManager`: Component for managing grid layouts
- `MixedManager`: Component for managing mixed layouts
- `FeaturedManager`: Component for managing featured layouts
- `DroppableColumn`: Component for creating droppable columns
- `ArticlesPool`: Component for displaying available articles
- `StyleConfigModal`: Component for configuring block styles

## Types

- `BlockConfig`: Configuration type for block styling and layout
- `Article`: Type for article data
- `ListVariantType`: Type for list variants
- `GridVariantType`: Type for grid variants
- `MixedVariantType`: Type for mixed variants
- `FeaturedVariantType`: Type for featured variants

## Development

To develop and test this library locally:

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`
4. Build the library: `yarn build`

## Using with Yalc for Local Testing

To test this library in another project locally:

1. Install yalc globally: `npm install -g yalc`
2. Build the library: `yarn build`
3. Publish to local yalc store: `yalc publish`
4. In your consuming project: `yalc add @umbriel/components`
5. After making changes to the library: `yarn build && yalc push`
