# Gerenciadores de Layout

## Visão Geral

Os gerenciadores de layout são componentes especializados que implementam diferentes estratégias de organização de conteúdo. Cada gerenciador é responsável por:

- Renderizar um layout específico
- Implementar regras de drag and drop
- Gerenciar estado interno
- Validar operações
- Fornecer feedback visual

## Tipos de Layout

### GridManager

O GridManager implementa um layout em grid flexível com suporte a múltiplas colunas.

#### Características

- Layout em grid responsivo
- Colunas configuráveis
- Suporte a diferentes tamanhos de artigo
- Validação de posicionamento

#### Configuração

```typescript
interface GridConfig {
  columns: number;
  gap: number;
  maxArticles: number;
  columnWidths: string[];
  visualIdentifiers: {
    color: string;
    label: string;
  }[];
}
```

#### Exemplo de Uso

```tsx
<GridManager
  articles={articles}
  config={gridConfig}
  onDrop={handleDrop}
  isDarkTheme={isDark}
/>
```

### ListManager

O ListManager implementa um layout vertical simples com uma única coluna.

#### Características

- Layout vertical
- Ordenação simples
- Suporte a grupos
- Validação de sequência

#### Configuração

```typescript
interface ListConfig {
  maxItems: number;
  spacing: number;
  grouping: boolean;
  sortable: boolean;
}
```

#### Exemplo de Uso

```tsx
<ListManager
  articles={articles}
  config={listConfig}
  onReorder={handleReorder}
  isDarkTheme={isDark}
/>
```

### MixedManager

O MixedManager combina diferentes tipos de layout em uma única interface.

#### Características

- Múltiplas seções
- Layouts independentes por seção
- Drag and drop entre seções
- Regras complexas de validação

#### Configuração

```typescript
interface MixedConfig {
  sections: {
    id: string;
    type: 'grid' | 'list';
    config: GridConfig | ListConfig;
  }[];
  spacing: number;
}
```

#### Exemplo de Uso

```tsx
<MixedManager
  articles={articles}
  config={mixedConfig}
  onLayoutChange={handleChange}
  isDarkTheme={isDark}
/>
```

## Implementação

### Estrutura Base

Todos os gerenciadores de layout seguem uma estrutura base comum:

```typescript
abstract class BaseLayoutManager {
  protected config: LayoutConfig;
  protected articles: Article[];
  
  abstract renderLayout(): JSX.Element;
  abstract validateDrop(source: string, target: string): boolean;
  abstract handleDrop(result: DropResult): void;
  
  protected getArticleById(id: string): Article | undefined {
    return this.articles.find(article => article.id === id);
  }
  
  protected updateLayout(): void {
    // Atualização comum do layout
  }
}
```

### Validação

Cada gerenciador implementa suas próprias regras de validação:

```typescript
// GridManager
validateDrop(source: string, target: string): boolean {
  const sourceColumn = this.getColumnById(source);
  const targetColumn = this.getColumnById(target);
  
  if (!sourceColumn || !targetColumn) return false;
  
  return this.validateColumnRules(sourceColumn, targetColumn);
}

// ListManager
validateDrop(source: string, target: string): boolean {
  return this.validateSequence(source, target);
}

// MixedManager
validateDrop(source: string, target: string): boolean {
  const sourceSection = this.getSectionById(source);
  const targetSection = this.getSectionById(target);
  
  return this.validateSectionRules(sourceSection, targetSection);
}
```

## Regras de Layout

### GridManager

1. **Regras de Coluna**
   - Máximo de artigos por coluna
   - Tipos de artigo permitidos
   - Ordem de prioridade

2. **Regras de Grid**
   - Distribuição de espaço
   - Responsividade
   - Gaps e margens

### ListManager

1. **Regras de Lista**
   - Ordem sequencial
   - Agrupamento
   - Espaçamento

2. **Regras de Grupo**
   - Tipos permitidos
   - Limites de tamanho
   - Hierarquia

### MixedManager

1. **Regras de Seção**
   - Compatibilidade entre seções
   - Limites por seção
   - Prioridades

2. **Regras Globais**
   - Layout responsivo
   - Navegação entre seções
   - Feedback visual

## Performance

### Otimizações

1. **Renderização**
   ```typescript
   const MemoizedLayout = memo(({ articles, config }) => {
     return useMemo(() => (
       <LayoutContainer>
         {renderArticles(articles, config)}
       </LayoutContainer>
     ), [articles, config]);
   });
   ```

2. **Cálculos**
   ```typescript
   const layoutDimensions = useMemo(() => {
     return calculateDimensions(config);
   }, [config]);
   ```

3. **Eventos**
   ```typescript
   const handleDrop = useCallback((result) => {
     if (!validateDrop(result)) return;
     updateLayout(result);
   }, [validateDrop, updateLayout]);
   ```

## Acessibilidade

### Recursos

1. **Navegação por Teclado**
   - Suporte a teclas de seta
   - Atalhos personalizáveis
   - Foco visual

2. **ARIA Labels**
   ```tsx
   <DroppableColumn
     aria-label="Coluna Principal"
     role="region"
     tabIndex={0}
   >
     {/* conteúdo */}
   </DroppableColumn>
   ```

3. **Feedback Visual**
   - Indicadores de drag
   - Estados de hover
   - Mensagens de erro

## Customização

### Temas

```typescript
interface LayoutTheme {
  colors: {
    background: string;
    border: string;
    text: string;
    accent: string;
  };
  spacing: {
    gap: number;
    padding: number;
    margin: number;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
  };
}
```

### Estilos

```typescript
const StyledLayout = styled.div<LayoutProps>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: ${props => props.theme.spacing.gap}px;
  padding: ${props => props.theme.spacing.padding}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
```

## Debugging

### Ferramentas

1. **Layout Inspector**
   ```typescript
   const LayoutInspector = () => {
     const layout = useLayoutDebugger();
     return <DebugPanel data={layout} />;
   };
   ```

2. **Validação Visual**
   ```typescript
   const ValidationOverlay = () => {
     const errors = useLayoutValidation();
     return errors.map(error => (
       <ErrorIndicator key={error.id} {...error} />
     ));
   };
   ```

## Exemplos

### Grid Básico

```tsx
const BasicGrid = () => {
  const config: GridConfig = {
    columns: 3,
    gap: 16,
    maxArticles: 9,
    columnWidths: ['1fr', '1fr', '1fr']
  };
  
  return (
    <GridManager
      articles={articles}
      config={config}
      onDrop={handleDrop}
    />
  );
};
```

### Lista com Grupos

```tsx
const GroupedList = () => {
  const config: ListConfig = {
    maxItems: 10,
    spacing: 8,
    grouping: true,
    sortable: true
  };
  
  return (
    <ListManager
      articles={articles}
      config={config}
      onReorder={handleReorder}
    />
  );
};
```

### Layout Misto

```tsx
const MixedLayout = () => {
  const config: MixedConfig = {
    sections: [
      {
        id: 'featured',
        type: 'grid',
        config: featuredGridConfig
      },
      {
        id: 'list',
        type: 'list',
        config: listConfig
      }
    ],
    spacing: 24
  };
  
  return (
    <MixedManager
      articles={articles}
      config={config}
      onLayoutChange={handleChange}
    />
  );
}; 