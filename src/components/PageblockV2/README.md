# PageBlockV2

Um sistema flexível de blocos de conteúdo para exibição de artigos em diferentes layouts.

## Arquitetura

```
PageBlockV2/
├── blocks/                  # Blocos principais
│   ├── GridBlock/          # Bloco de grid
│   │   ├── variants/       # Variantes do grid
│   │   │   ├── StandardGrid.tsx   # Grid padrão responsivo
│   │   │   ├── MasonryGrid.tsx    # Grid estilo Pinterest
│   │   │   └── FeaturedGrid.tsx   # Grid com destaque
│   │   └── index.tsx
│   ├── FeaturedBlock/      # Bloco de destaque
│   │   ├── variants/
│   │   │   ├── Hero.tsx          # Banner hero com imagem full
│   │   │   ├── Split.tsx         # Layout 50/50 imagem/texto
│   │   │   └── Triple.tsx        # Três cards em destaque
│   │   └── index.tsx
│   ├── ListBlock/          # Bloco de lista
│   │   ├── variants/
│   │   │   ├── CompactList.tsx        # Lista simples
│   │   │   ├── ListWithThumbnail.tsx  # Lista com miniaturas
│   │   │   └── Chronological.tsx      # Lista com timeline
│   │   └── index.tsx
│   └── MixedBlock/         # Bloco misto
│       ├── variants/
│       │   ├── Sidebar.tsx        # Layout principal + sidebar
│       │   ├── Magazine.tsx       # Layout estilo revista
│       │   └── Newspaper.tsx      # Layout jornal com destaque
│       └── index.tsx
├── contexts/               
│   └── ResponsiveDeviceContext.tsx  # Contexto de responsividade
├── hooks/                  
│   ├── useBlockStyles.ts           # Hook de estilos do bloco
│   ├── useLocalTheme.ts            # Hook de tema (light/dark)
│   └── useResponsiveGrid.ts        # Hook de grid responsivo
├── types/                 
│   └── index.ts                    # Tipagens compartilhadas
└── index.tsx                       # Componente principal
```

## Funcionalidades

### Responsividade
- Mobile: < 768px (1 coluna)
- Tablet: 768px - 1024px (2-3 colunas)
- Desktop: > 1024px (configurável)

### Temas
- Light/Dark mode
- Cores customizáveis por tema
- Estilos de fonte configuráveis
- Backgrounds personalizáveis

### Layouts
Cada bloco possui variantes específicas para diferentes necessidades:

#### Grid
- **StandardGrid**: Grid responsivo com colunas configuráveis
- **MasonryGrid**: Grid assimétrico estilo Pinterest
- **FeaturedGrid**: Grid com primeiro item em destaque

#### Featured
- **Hero**: Banner full com overlay de texto
- **Split**: Layout dividido com imagem e texto
- **Triple**: Três cards em destaque lado a lado

#### List
- **CompactList**: Lista simples com título e descrição
- **ListWithThumbnail**: Lista com miniaturas à esquerda
- **Chronological**: Lista com timeline vertical

#### Mixed
- **Sidebar**: Conteúdo principal + sidebar lateral
- **Magazine**: Layout complexo estilo revista
- **Newspaper**: Layout de jornal com hierarquia

## Uso

### Instalação
```bash
npm install @umbriel/components
# ou
yarn add @umbriel/components
```

### Exemplo Básico
```tsx
import { PageBlockV2 } from '@umbriel/components';

const MyComponent = () => {
  return (
    <PageBlockV2
      block={{
        id: "my-block",
        blockType: "articles",
        template: "grid",
        variants: [{
          variantType: "standard",
          variantPosition: 1,
          config: {
            layout: {
              responsive: {
                mobile: 1,
                tablet: 2,
                desktop: 3
              },
              gap: "1.5rem",
              padding: "2rem",
              columns: 3
            },
            styles: {
              theme: {
                light: {
                  columnStyle: { background: "#fff" },
                  headingProps: {
                    fontSize: "1.5rem",
                    color: "#000"
                  }
                },
                dark: {
                  columnStyle: { background: "#1a1a1a" },
                  headingProps: {
                    fontSize: "1.5rem",
                    color: "#fff"
                  }
                }
              },
              showExcerpt: true
            },
            articles: {
              "col-0": [/* array de artigos */]
            }
          }
        }]
      }}
      isDarkTheme={false}
    />
  );
};
```

## Props

### PageBlockV2
| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| block | PageBlock | Sim | Configuração do bloco |
| isDarkTheme | boolean | Não | Controle do tema escuro |

### BlockConfig
| Prop | Tipo | Descrição |
|------|------|-----------|
| layout | LayoutConfig | Configurações de layout |
| styles | StyleConfig | Configurações de estilo |
| articles | Record<string, Article[]> | Artigos do bloco |

## Customização

O componente aceita customizações via:
- Props de configuração
- Temas light/dark
- Classes CSS customizadas
- Estilos inline
- Responsividade por breakpoint

## Desenvolvimento

Para rodar os stories:
```bash
yarn storybook
```

Para testar localmente:
```bash
yarn build
yarn yalc publish
``` 