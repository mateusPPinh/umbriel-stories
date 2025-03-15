# Arquitetura do Sistema

## Estrutura de Diretórios

```
BlockManagerDragDrop/
├── components/           # Componentes reutilizáveis
│   ├── DroppableColumn/ # Colunas que aceitam drag and drop
│   ├── ArticlesPool/    # Pool de artigos disponíveis
│   └── Preview/         # Componente de preview
├── hooks/               # Hooks customizados
│   ├── useBlockState/   # Gerenciamento de estado
│   └── useDragDrop/     # Lógica de drag and drop
├── contexts/            # Contextos React
│   └── BlockContext/    # Contexto global do bloco
├── types/              # Definições de tipos
└── utils/              # Funções utilitárias
```

## Componentes Principais

### BlockManagerDragDrop

O componente raiz que orquestra todo o sistema. Responsável por:
- Inicialização do estado
- Renderização do layout apropriado
- Gerenciamento de configurações
- Integração com APIs externas

```tsx
<BlockManagerDragDrop
  pageId="string"
  articles={Article[]}
  variant="grid" | "list" | "mixed"
  onSave={(data) => void}
  blockConfig={BlockConfig}
/>
```

### Layout Managers

Componentes especializados para cada tipo de layout:
- **GridManager**: Layout em grid com colunas configuráveis
- **ListManager**: Layout em lista vertical
- **MixedManager**: Layout híbrido com diferentes seções

Cada manager implementa:
- Lógica específica de layout
- Regras de drag and drop
- Validações de layout
- Renderização de colunas

### DroppableColumn

Componente base para colunas que aceitam artigos:
- Implementa interface do react-beautiful-dnd
- Gerencia estado interno
- Renderiza artigos
- Aplica estilos e animações

## Fluxo de Dados

### Estado Global

```typescript
interface BlockState {
  articles: Article[];
  selectedArticles: string[];
  layout: LayoutConfig;
  isDragging: boolean;
  // ... outros estados
}
```

### Contexto

O `BlockContext` fornece:
- Estado global
- Funções de atualização
- Configurações
- Callbacks de eventos

### Eventos

1. **Drag Start**
   ```mermaid
   sequenceDiagram
       User->>DroppableColumn: Inicia drag
       DroppableColumn->>useDragDrop: onDragStart
       useDragDrop->>BlockContext: setIsDragging(true)
       BlockContext->>UI: Atualiza visual
   ```

2. **Drop**
   ```mermaid
   sequenceDiagram
       User->>DroppableColumn: Solta item
       DroppableColumn->>useDragDrop: onDragEnd
       useDragDrop->>BlockContext: updateLayout
       BlockContext->>UI: Re-render
   ```

## Gerenciamento de Estado

### useBlockState

Hook principal para gerenciamento de estado:

```typescript
const {
  state,
  addArticle,
  removeArticle,
  moveArticle,
  updateLayout,
  // ... outros métodos
} = useBlockState(initialState);
```

### Imutabilidade

O estado é sempre atualizado de forma imutável:

```typescript
const updateLayout = (newLayout) => {
  setState(prev => ({
    ...prev,
    layout: {
      ...prev.layout,
      ...newLayout
    }
  }));
};
```

## Sistema de Temas

### Configuração

```typescript
interface ThemeConfig {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    column: number;
    item: number;
  };
}
```

### Aplicação

Os temas são aplicados através de:
- CSS-in-JS
- Variáveis CSS
- Classes condicionais

## Performance

### Otimizações

1. **Memorização**
   ```typescript
   const memoizedLayout = useMemo(() => (
     // cálculos de layout
   ), [dependencies]);
   ```

2. **Virtualização**
   - Implementada para listas longas
   - Renderiza apenas itens visíveis
   - Reduz DOM nodes

3. **Code Splitting**
   ```typescript
   const DynamicComponent = dynamic(() => 
     import('./Component')
   );
   ```

## Integração

### API

```typescript
interface BlockManagerAPI {
  save: (data: BlockData) => Promise<void>;
  load: (pageId: string) => Promise<BlockData>;
  validate: (layout: Layout) => boolean;
}
```

### Eventos

```typescript
interface BlockManagerEvents {
  onSave: (data: BlockData) => void;
  onChange: (state: BlockState) => void;
  onError: (error: Error) => void;
}
```

## Considerações de Segurança

1. **Validação de Dados**
   - Validação de tipos
   - Sanitização de input
   - Verificação de limites

2. **Prevenção de Erros**
   - Error boundaries
   - Fallbacks
   - Logging

## Extensibilidade

### Plugins

```typescript
interface BlockManagerPlugin {
  name: string;
  hooks: {
    beforeDrag?: () => void;
    afterDrop?: () => void;
    // ... outros hooks
  };
  components?: {
    [key: string]: React.ComponentType;
  };
}
```

### Customização

- Temas customizados
- Layouts personalizados
- Componentes substituíveis
- Hooks personalizados 