# Componentes Principais

## Visão Geral

O sistema é composto por vários componentes principais que trabalham em conjunto para fornecer a funcionalidade completa do BlockManagerDragDrop. Cada componente tem uma responsabilidade específica e é construído seguindo princípios de componentização e reusabilidade.

## BlockManagerDragDrop

O componente raiz que orquestra todo o sistema.

### Props

```typescript
interface BlockManagerDragDropProps {
  pageId: string;
  articles: Article[];
  variant: 'grid' | 'list' | 'mixed';
  onSave: (data: BlockData) => void;
  blockConfig?: BlockConfig;
  isDarkTheme?: boolean;
}
```

### Implementação

```tsx
const BlockManagerDragDrop: React.FC<BlockManagerDragDropProps> = ({
  pageId,
  articles,
  variant,
  onSave,
  blockConfig,
  isDarkTheme
}) => {
  return (
    <BlockProvider
      initialState={{
        pageId,
        articles,
        variant,
        blockConfig,
        isDarkTheme
      }}
    >
      <DragDropContext>
        <LayoutManager />
        <ArticlesPool />
        <BlockControls onSave={onSave} />
      </DragDropContext>
    </BlockProvider>
  );
};
```

## DroppableColumn

Componente que representa uma coluna que pode receber artigos.

### Props

```typescript
interface DroppableColumnProps {
  columnId: string;
  articles: Article[];
  maxItems?: number;
  isDarkTheme?: boolean;
  label?: string;
  blockConfig?: BlockConfig;
  handleRemoveArticle?: (articleId: string) => void;
  visualIdentifier?: {
    color: string;
    label: string;
  };
}
```

### Implementação

```tsx
const DroppableColumn: React.FC<DroppableColumnProps> = ({
  columnId,
  articles,
  maxItems,
  isDarkTheme,
  label,
  visualIdentifier,
  handleRemoveArticle
}) => {
  const hasReachedLimit = maxItems ? articles.length >= maxItems : false;
  
  return (
    <div className="droppable-column">
      {visualIdentifier && (
        <div 
          className="visual-identifier"
          style={{ backgroundColor: visualIdentifier.color }}
        >
          <span>{visualIdentifier.label}</span>
        </div>
      )}
      
      <Droppable
        droppableId={columnId}
        isDropDisabled={hasReachedLimit}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              'column-content',
              isDarkTheme && 'dark',
              snapshot.isDraggingOver && 'dragging-over'
            )}
          >
            {articles.map((article, index) => (
              <DraggableArticle
                key={article.id}
                article={article}
                index={index}
                onRemove={handleRemoveArticle}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      {label && (
        <div className="column-label">
          <span>{label}</span>
          <span className="article-count">
            {articles.length}/{maxItems || '∞'}
          </span>
        </div>
      )}
    </div>
  );
};
```

## DraggableArticle

Componente que representa um artigo que pode ser arrastado.

### Props

```typescript
interface DraggableArticleProps {
  article: Article;
  index: number;
  isSelected?: boolean;
  onRemove?: (id: string) => void;
  onClick?: (id: string, event: MouseEvent) => void;
}
```

### Implementação

```tsx
const DraggableArticle: React.FC<DraggableArticleProps> = ({
  article,
  index,
  isSelected,
  onRemove,
  onClick
}) => {
  const handleClick = useCallback((event: MouseEvent) => {
    onClick?.(article.id, event);
  }, [article.id, onClick]);
  
  const handleRemove = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    onRemove?.(article.id);
  }, [article.id, onRemove]);
  
  return (
    <Draggable
      draggableId={article.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            'draggable-article',
            isSelected && 'selected',
            snapshot.isDragging && 'dragging'
          )}
          onClick={handleClick}
        >
          <ArticleCard article={article} />
          {onRemove && (
            <button
              className="remove-button"
              onClick={handleRemove}
              aria-label="Remover artigo"
            >
              ×
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
};
```

## ArticlesPool

Componente que exibe os artigos disponíveis para serem adicionados ao layout.

### Props

```typescript
interface ArticlesPoolProps {
  articles: Article[];
  onArticleSelect?: (article: Article) => void;
  selectedArticles?: string[];
  isDarkTheme?: boolean;
}
```

### Implementação

```tsx
const ArticlesPool: React.FC<ArticlesPoolProps> = ({
  articles,
  onArticleSelect,
  selectedArticles,
  isDarkTheme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<ArticleFilter>('all');
  
  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        if (filter === 'all') return true;
        return article.type === filter;
      })
      .filter(article => {
        if (!searchTerm) return true;
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [articles, filter, searchTerm]);
  
  return (
    <div className={clsx('articles-pool', isDarkTheme && 'dark')}>
      <div className="pool-header">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Buscar artigos..."
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as ArticleFilter)}
        >
          <option value="all">Todos</option>
          <option value="news">Notícias</option>
          <option value="blog">Blog</option>
        </select>
      </div>
      
      <div className="pool-content">
        {filteredArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            isSelected={selectedArticles?.includes(article.id)}
            onClick={() => onArticleSelect?.(article)}
          />
        ))}
      </div>
    </div>
  );
};
```

## BlockControls

Componente que fornece controles para gerenciar o bloco.

### Props

```typescript
interface BlockControlsProps {
  onSave: (data: BlockData) => void;
  onReset?: () => void;
  onPreview?: () => void;
}
```

### Implementação

```tsx
const BlockControls: React.FC<BlockControlsProps> = ({
  onSave,
  onReset,
  onPreview
}) => {
  const { state } = useBlockState();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true);
      await onSave(state);
      toast.success('Layout salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar o layout');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }, [state, onSave]);
  
  return (
    <div className="block-controls">
      <button
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Salvando...' : 'Salvar'}
      </button>
      
      {onReset && (
        <button
          onClick={onReset}
          className="reset-button"
        >
          Resetar
        </button>
      )}
      
      {onPreview && (
        <button
          onClick={onPreview}
          className="preview-button"
        >
          Preview
        </button>
      )}
    </div>
  );
};
```

## ArticleCard

Componente que exibe as informações de um artigo.

### Props

```typescript
interface ArticleCardProps {
  article: Article;
  isSelected?: boolean;
  isDragging?: boolean;
  onClick?: (article: Article) => void;
}
```

### Implementação

```tsx
const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isSelected,
  isDragging,
  onClick
}) => {
  const handleClick = useCallback(() => {
    onClick?.(article);
  }, [article, onClick]);
  
  return (
    <div
      className={clsx(
        'article-card',
        isSelected && 'selected',
        isDragging && 'dragging'
      )}
      onClick={handleClick}
    >
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="article-thumbnail"
        />
      )}
      
      <div className="article-info">
        <h3 className="article-title">{article.title}</h3>
        
        <div className="article-meta">
          <span className="article-type">{article.type}</span>
          <span className="article-date">
            {formatDate(article.publishDate)}
          </span>
        </div>
        
        {article.description && (
          <p className="article-description">
            {article.description}
          </p>
        )}
      </div>
    </div>
  );
};
```

## Estilos

### Tema Base

```typescript
const baseTheme = {
  colors: {
    primary: '#0066cc',
    secondary: '#666666',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333',
    border: '#dddddd',
    error: '#dc3545',
    success: '#28a745'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  }
};
```

### Estilos Compartilhados

```typescript
const sharedStyles = css`
  .draggable-article {
    cursor: grab;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${baseTheme.shadows.md};
    }
    
    &.dragging {
      cursor: grabbing;
      transform: scale(1.02);
      box-shadow: ${baseTheme.shadows.lg};
    }
    
    &.selected {
      border: 2px solid ${baseTheme.colors.primary};
    }
  }
  
  .droppable-column {
    background: ${baseTheme.colors.surface};
    border-radius: ${baseTheme.borderRadius.md};
    padding: ${baseTheme.spacing.md};
    
    &.dragging-over {
      background: ${baseTheme.colors.background};
      box-shadow: ${baseTheme.shadows.md};
    }
  }
  
  .article-card {
    background: ${baseTheme.colors.background};
    border: 1px solid ${baseTheme.colors.border};
    border-radius: ${baseTheme.borderRadius.sm};
    padding: ${baseTheme.spacing.md};
    margin-bottom: ${baseTheme.spacing.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
```

## Acessibilidade

### Recursos de A11y

```typescript
const a11yConfig = {
  messages: {
    onDragStart: (id: string) => `Começou a arrastar o artigo ${id}`,
    onDrop: (id: string, destination: string) => 
      `Artigo ${id} movido para ${destination}`,
    onCancel: () => 'Operação de drag and drop cancelada'
  },
  roles: {
    article: 'article',
    column: 'region',
    pool: 'complementary'
  },
  keyboardShortcuts: {
    selectAll: 'Control+A',
    copy: 'Control+C',
    paste: 'Control+V',
    save: 'Control+S'
  }
};
```

## Exemplos de Uso

### Layout Básico

```tsx
const BasicLayout = () => {
  const articles = useArticles();
  
  const handleSave = useCallback((data: BlockData) => {
    console.log('Saving layout:', data);
  }, []);
  
  return (
    <BlockManagerDragDrop
      pageId="home"
      articles={articles}
      variant="grid"
      onSave={handleSave}
      blockConfig={{
        columns: 3,
        spacing: 16,
        maxArticles: 9
      }}
    />
  );
};
```

### Layout com Tema Escuro

```tsx
const DarkLayout = () => {
  const articles = useArticles();
  const { isDarkMode } = useTheme();
  
  return (
    <BlockManagerDragDrop
      pageId="featured"
      articles={articles}
      variant="mixed"
      isDarkTheme={isDarkMode}
      blockConfig={{
        sections: [
          {
            id: 'featured',
            type: 'grid',
            columns: 2
          },
          {
            id: 'list',
            type: 'list'
          }
        ]
      }}
      onSave={handleSave}
    />
  );
}; 