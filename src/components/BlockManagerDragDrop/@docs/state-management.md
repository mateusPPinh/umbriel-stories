# Gerenciamento de Estado

## Visão Geral

O sistema utiliza uma combinação de Context API e hooks customizados para gerenciar o estado global e local dos componentes. O estado é gerenciado de forma imutável e segue princípios de unidirecionalidade de dados.

## Estado Global

### BlockContext

O contexto principal que mantém o estado global do sistema:

```typescript
interface BlockState {
  articles: Article[];
  selectedArticles: string[];
  layout: LayoutConfig;
  isDragging: boolean;
  isEditing: boolean;
  theme: ThemeConfig;
  errors: ErrorState[];
}

interface BlockContextValue {
  state: BlockState;
  dispatch: BlockDispatch;
  actions: BlockActions;
}

const BlockContext = createContext<BlockContextValue | undefined>(undefined);
```

### Provider

```typescript
const BlockProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(blockReducer, initialState);
  const actions = useMemo(() => createActions(dispatch), []);
  
  const value = useMemo(() => ({
    state,
    dispatch,
    actions
  }), [state, actions]);
  
  return (
    <BlockContext.Provider value={value}>
      {children}
    </BlockContext.Provider>
  );
};
```

## Hooks Customizados

### useBlockState

Hook principal para gerenciar o estado do bloco:

```typescript
const useBlockState = (initialState: Partial<BlockState> = {}) => {
  const context = useContext(BlockContext);
  
  if (!context) {
    throw new Error('useBlockState must be used within a BlockProvider');
  }
  
  const { state, actions } = context;
  
  const {
    addArticle,
    removeArticle,
    moveArticle,
    updateLayout,
    setTheme,
    setError
  } = actions;
  
  return {
    state,
    addArticle,
    removeArticle,
    moveArticle,
    updateLayout,
    setTheme,
    setError
  };
};
```

### useLayoutState

Hook para gerenciar o estado específico do layout:

```typescript
const useLayoutState = () => {
  const { state, actions } = useBlockState();
  const { layout } = state;
  
  const updateColumnConfig = useCallback((
    columnId: string,
    config: Partial<ColumnConfig>
  ) => {
    actions.updateLayout({
      ...layout,
      columns: {
        ...layout.columns,
        [columnId]: {
          ...layout.columns[columnId],
          ...config
        }
      }
    });
  }, [layout, actions]);
  
  return {
    layout,
    updateColumnConfig
  };
};
```

## Ações

### Action Types

```typescript
enum BlockActionType {
  ADD_ARTICLE = 'ADD_ARTICLE',
  REMOVE_ARTICLE = 'REMOVE_ARTICLE',
  MOVE_ARTICLE = 'MOVE_ARTICLE',
  UPDATE_LAYOUT = 'UPDATE_LAYOUT',
  SET_THEME = 'SET_THEME',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR'
}

interface BlockAction {
  type: BlockActionType;
  payload: any;
}
```

### Action Creators

```typescript
const createActions = (dispatch: BlockDispatch): BlockActions => ({
  addArticle: (article: Article) => 
    dispatch({ type: BlockActionType.ADD_ARTICLE, payload: article }),
    
  removeArticle: (articleId: string) =>
    dispatch({ type: BlockActionType.REMOVE_ARTICLE, payload: articleId }),
    
  moveArticle: (source: string, destination: string) =>
    dispatch({
      type: BlockActionType.MOVE_ARTICLE,
      payload: { source, destination }
    }),
    
  updateLayout: (layout: LayoutConfig) =>
    dispatch({ type: BlockActionType.UPDATE_LAYOUT, payload: layout }),
    
  setTheme: (theme: ThemeConfig) =>
    dispatch({ type: BlockActionType.SET_THEME, payload: theme }),
    
  setError: (error: ErrorState) =>
    dispatch({ type: BlockActionType.SET_ERROR, payload: error })
});
```

## Reducer

### Block Reducer

```typescript
const blockReducer = (state: BlockState, action: BlockAction): BlockState => {
  switch (action.type) {
    case BlockActionType.ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
      
    case BlockActionType.REMOVE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== action.payload
        )
      };
      
    case BlockActionType.MOVE_ARTICLE:
      return {
        ...state,
        layout: updateLayoutWithMove(
          state.layout,
          action.payload.source,
          action.payload.destination
        )
      };
      
    case BlockActionType.UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload
      };
      
    case BlockActionType.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
      
    case BlockActionType.SET_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
      
    case BlockActionType.CLEAR_ERROR:
      return {
        ...state,
        errors: state.errors.filter(
          error => error.id !== action.payload
        )
      };
      
    default:
      return state;
  }
};
```

## Seletores

### Memoized Selectors

```typescript
const useArticleSelectors = () => {
  const { state } = useBlockState();
  
  const getArticleById = useCallback((id: string) => {
    return state.articles.find(article => article.id === id);
  }, [state.articles]);
  
  const getArticlesByColumn = useCallback((columnId: string) => {
    return state.articles.filter(
      article => article.columnId === columnId
    );
  }, [state.articles]);
  
  const getSelectedArticles = useCallback(() => {
    return state.articles.filter(
      article => state.selectedArticles.includes(article.id)
    );
  }, [state.articles, state.selectedArticles]);
  
  return {
    getArticleById,
    getArticlesByColumn,
    getSelectedArticles
  };
};
```

## Persistência

### Local Storage

```typescript
const useBlockPersistence = () => {
  const { state, actions } = useBlockState();
  
  useEffect(() => {
    const savedState = localStorage.getItem('blockState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.entries(parsedState).forEach(([key, value]) => {
        actions[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
      });
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('blockState', JSON.stringify(state));
  }, [state]);
  
  return null;
};
```

### API Integration

```typescript
const useBlockSync = () => {
  const { state, actions } = useBlockState();
  
  const saveToAPI = useCallback(async () => {
    try {
      await api.saveBlockState(state);
    } catch (error) {
      actions.setError({
        id: Date.now(),
        message: 'Failed to save state',
        error
      });
    }
  }, [state, actions]);
  
  const loadFromAPI = useCallback(async () => {
    try {
      const savedState = await api.loadBlockState();
      Object.entries(savedState).forEach(([key, value]) => {
        actions[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
      });
    } catch (error) {
      actions.setError({
        id: Date.now(),
        message: 'Failed to load state',
        error
      });
    }
  }, [actions]);
  
  return {
    saveToAPI,
    loadFromAPI
  };
};
```

## Performance

### Otimizações

1. **Memoização de Valores**
   ```typescript
   const useMemoizedLayout = () => {
     const { state } = useBlockState();
     
     return useMemo(() => {
       return calculateLayout(state.layout);
     }, [state.layout]);
   };
   ```

2. **Batch Updates**
   ```typescript
   const useBlockBatchUpdate = () => {
     const { actions } = useBlockState();
     
     const batchUpdate = useCallback((updates: Partial<BlockState>) => {
       ReactDOM.unstable_batchedUpdates(() => {
         Object.entries(updates).forEach(([key, value]) => {
           actions[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
         });
       });
     }, [actions]);
     
     return { batchUpdate };
   };
   ```

3. **Debounced Updates**
   ```typescript
   const useDebounceUpdate = (delay = 300) => {
     const { actions } = useBlockState();
     
     const debouncedUpdate = useCallback(
       debounce((layout: LayoutConfig) => {
         actions.updateLayout(layout);
       }, delay),
       [actions]
     );
     
     return { debouncedUpdate };
   };
   ```

## Debug

### Logging Middleware

```typescript
const createLoggingMiddleware = (dispatch: BlockDispatch): BlockDispatch => {
  return (action: BlockAction) => {
    console.group('Block Action');
    console.log('Previous State:', store.getState());
    console.log('Action:', action);
    const result = dispatch(action);
    console.log('Next State:', store.getState());
    console.groupEnd();
    return result;
  };
};
```

### Dev Tools

```typescript
const BlockDevTools: React.FC = () => {
  const { state } = useBlockState();
  
  return (
    <div className="block-dev-tools">
      <h3>Block State</h3>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};
```

## Exemplos

### Uso Básico

```tsx
const BlockExample = () => {
  const { state, addArticle, removeArticle } = useBlockState();
  
  return (
    <div>
      <button onClick={() => addArticle(newArticle)}>
        Add Article
      </button>
      
      {state.articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onRemove={() => removeArticle(article.id)}
        />
      ))}
    </div>
  );
};
```

### Layout Complexo

```tsx
const ComplexLayout = () => {
  const { layout, updateColumnConfig } = useLayoutState();
  const { getArticlesByColumn } = useArticleSelectors();
  
  return (
    <div className="complex-layout">
      {Object.entries(layout.columns).map(([columnId, config]) => (
        <Column
          key={columnId}
          id={columnId}
          config={config}
          articles={getArticlesByColumn(columnId)}
          onConfigChange={newConfig => 
            updateColumnConfig(columnId, newConfig)
          }
        />
      ))}
    </div>
  );
}; 