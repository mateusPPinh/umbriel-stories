# Sistema de Drag and Drop

## Visão Geral

O sistema de drag and drop é implementado usando o `react-beautiful-dnd` e fornece uma interface intuitiva para reorganização de artigos. O sistema suporta:

- Drag and drop entre colunas
- Multi-seleção de artigos
- Validação em tempo real
- Feedback visual
- Acessibilidade

## Componentes

### DragDropContext

O componente wrapper que gerencia todo o sistema de drag and drop:

```tsx
<DragDropContext
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>
  {/* Layout components */}
</DragDropContext>
```

### DroppableColumn

Componente que representa uma área que pode receber artigos:

```tsx
interface DroppableColumnProps {
  columnId: string;
  articles: Article[];
  maxItems?: number;
  isDarkTheme?: boolean;
  label?: string;
  blockConfig?: BlockConfig;
  handleRemoveArticle?: (articleId: string) => void;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  columnId,
  articles,
  maxItems,
  ...props
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {articles.map((article, index) => (
            <DraggableArticle
              key={article.id}
              article={article}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
```

### DraggableArticle

Componente que representa um artigo arrastável:

```tsx
interface DraggableArticleProps {
  article: Article;
  index: number;
  isSelected?: boolean;
}

const DraggableArticle: React.FC<DraggableArticleProps> = ({
  article,
  index,
  isSelected
}) => {
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
        >
          <ArticleCard
            article={article}
            isDragging={snapshot.isDragging}
            isSelected={isSelected}
          />
        </div>
      )}
    </Draggable>
  );
};
```

## Hooks

### useDragDrop

Hook principal que gerencia a lógica de drag and drop:

```typescript
interface UseDragDropProps {
  onDrop: (result: DropResult) => void;
  validate?: (source: string, destination: string) => boolean;
}

const useDragDrop = ({ onDrop, validate }: UseDragDropProps) => {
  const handleDragStart = useCallback((initial: DragStart) => {
    // Lógica de início do drag
  }, []);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    
    if (validate && !validate(result.source.droppableId, result.destination.droppableId)) {
      return;
    }
    
    onDrop(result);
  }, [onDrop, validate]);

  return {
    handleDragStart,
    handleDragEnd
  };
};
```

### useMultiDrag

Hook para gerenciar multi-seleção:

```typescript
const useMultiDrag = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = useCallback((id: string, event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds([id]);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    selectedIds,
    handleSelect,
    clearSelection
  };
};
```

## Validação

### Regras de Validação

```typescript
interface ValidationRules {
  maxItems?: number;
  allowedTypes?: string[];
  customValidation?: (source: string, target: string) => boolean;
}

const validateDrop = (
  source: DroppableLocation,
  destination: DroppableLocation,
  rules: ValidationRules
): boolean => {
  // Validação básica
  if (!destination) return false;
  
  // Validação de quantidade
  if (rules.maxItems && getCurrentItems(destination) >= rules.maxItems) {
    return false;
  }
  
  // Validação de tipo
  if (rules.allowedTypes && !validateArticleType(source, rules.allowedTypes)) {
    return false;
  }
  
  // Validação customizada
  if (rules.customValidation) {
    return rules.customValidation(source.droppableId, destination.droppableId);
  }
  
  return true;
};
```

## Feedback Visual

### Estilos Durante o Drag

```typescript
const getDragStyle = (isDragging: boolean, draggableStyle: DraggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? 'lightblue' : 'white',
  ...draggableStyle
});

const getDropStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightgreen' : 'white',
  transition: 'background-color 0.2s ease'
});
```

### Indicadores Visuais

```tsx
const DropIndicator = styled.div<{ isVisible: boolean }>`
  height: 2px;
  background: ${props => props.theme.colors.primary};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const DragOverlay = styled.div<{ isDragging: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  pointer-events: none;
  opacity: ${props => props.isDragging ? 1 : 0};
  transition: opacity 0.2s ease;
`;
```

## Multi-seleção

### Seleção de Artigos

```typescript
interface SelectionManager {
  selectedIds: string[];
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
}

const useSelectionManager = (): SelectionManager => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isSelected = useCallback((id: string) => {
    return selectedIds.includes(id);
  }, [selectedIds]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    selectedIds,
    isSelected,
    toggleSelection,
    clearSelection
  };
};
```

## Eventos

### Handlers

```typescript
interface DragDropHandlers {
  onDragStart?: (initial: DragStart) => void;
  onDragUpdate?: (update: DragUpdate) => void;
  onDragEnd: (result: DropResult) => void;
}

const createHandlers = (config: DragDropConfig): DragDropHandlers => ({
  onDragStart: (initial) => {
    config.onStateChange({ isDragging: true });
    config.onSelectionChange([initial.draggableId]);
  },
  
  onDragUpdate: (update) => {
    if (!update.destination) return;
    config.onPreviewUpdate(update);
  },
  
  onDragEnd: (result) => {
    config.onStateChange({ isDragging: false });
    
    if (!result.destination) {
      config.onSelectionChange([]);
      return;
    }
    
    config.onDrop(result);
    config.onSelectionChange([]);
  }
});
```

## Performance

### Otimizações

1. **Memorização de Componentes**
   ```typescript
   const MemoizedDraggable = memo(DraggableArticle, (prev, next) => {
     return (
       prev.article.id === next.article.id &&
       prev.index === next.index &&
       prev.isSelected === next.isSelected
     );
   });
   ```

2. **Virtualização**
   ```typescript
   const VirtualizedDroppable = ({
     items,
     renderItem
   }: VirtualizedDroppableProps) => {
     return (
       <Droppable
         mode="virtual"
         renderClone={(provided, snapshot, rubric) => (
           renderItem(items[rubric.source.index], provided, snapshot)
         )}
       >
         {(provided) => (
           <VirtualList
             height={500}
             itemCount={items.length}
             itemSize={100}
             width="100%"
             ref={provided.innerRef}
           >
             {({ index, style }) => (
               <div style={style}>
                 {renderItem(items[index])}
               </div>
             )}
           </VirtualList>
         )}
       </Droppable>
     );
   };
   ```

## Acessibilidade

### Recursos de A11y

```typescript
const A11yProvider = ({ children }: PropsWithChildren) => {
  const messages = {
    onDragStart: (id: string) => `Começou a arrastar o artigo ${id}`,
    onDrop: (id: string, destination: string) => 
      `Artigo ${id} movido para ${destination}`,
    onCancel: () => 'Operação de drag and drop cancelada'
  };

  return (
    <DragDropContext
      sensors={[
        useMouseSensor,
        useKeyboardSensor,
        useTouchSensor
      ]}
      screenReaderMessages={messages}
    >
      {children}
    </DragDropContext>
  );
};
```

## Exemplos

### Uso Básico

```tsx
const BasicExample = () => {
  const { handleDragEnd } = useDragDrop({
    onDrop: (result) => {
      console.log('Item dropped:', result);
    }
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableColumn
        columnId="column-1"
        articles={articles}
      />
    </DragDropContext>
  );
};
```

### Multi-seleção

```tsx
const MultiSelectExample = () => {
  const { selectedIds, handleSelect } = useMultiDrag();
  const { handleDragEnd } = useDragDrop({
    onDrop: (result) => {
      // Lógica para mover múltiplos itens
    }
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableColumn
        columnId="column-1"
        articles={articles}
        onArticleClick={handleSelect}
        selectedIds={selectedIds}
      />
    </DragDropContext>
  );
};
```

### Validação Customizada

```tsx
const ValidatedExample = () => {
  const { handleDragEnd } = useDragDrop({
    onDrop: (result) => {
      console.log('Valid drop:', result);
    },
    validate: (source, destination) => {
      // Lógica de validação customizada
      return true;
    }
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableColumn
        columnId="column-1"
        articles={articles}
        maxItems={5}
      />
    </DragDropContext>
  );
}; 