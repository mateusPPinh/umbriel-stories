# useBlockState Hook Documentation

## Overview

The `useBlockState` hook is the central state management system that powers the BlockManagerDragDrop components. It provides a robust, consistent interface for managing article positions, variant configurations, and handling state updates across different layout types.

## Implementation

```typescript
export const useBlockState = ({
  pageId,
  template,
  initialVariant,
  initialArticles,
  blockPosition = 1
}: UseBlockStateProps) => {
  // State and methods implementation
  // ...
  
  return {
    blockState,
    updateArticlePositions,
    updateVariant,
    updateVariantPosition,
    updateBlockPosition,
    updateBlockConfig,
    getApiFormat
  };
};
```

## Props Interface

```typescript
interface UseBlockStateProps {
  pageId: string;            // Identifier for the page
  template: TemplateType;    // 'list', 'mixed', 'grid', 'featured', etc.
  initialVariant: VariantType; // Initial variant to use
  initialArticles: Article[]; // Array of articles to initialize with
  blockPosition?: number;    // Position of block in page layout
}
```

## State Structure

The hook maintains a complex state object with the following structure:

```typescript
type LocalBlockState = {
  pageId: string;
  blockType: string;
  blockPosition: number;
  articles: {
    [key: string]: Article[];  // Map of column IDs to article arrays
  };
  currentVariant: BlockVariant;
  variantStates: {
    [key: string]: VariantState; // Map of variant types to their specific states
  };
};

type VariantState = {
  variantType: VariantType;
  variantPosition: number;
  articles: {
    [key: string]: Article[];
  };
  config: BlockVariant['config'];
};
```

## Core Functionality

### State Initialization

State initialization is a critical aspect of the hook:

```typescript
const [blockState, setBlockState] = useState<LocalBlockState>(() => {
  // Default configuration initialization
  const defaultConfig = {
    layout: { /* layout configuration */ },
    articles: { /* article initialization */ },
    styles: {
      theme: {
        light: { /* light theme settings */ },
        dark: { /* dark theme settings */ }
      },
      showExcerpt: true
    }
  };

  // Initialize state for each supported variant
  const variantStates = {
    // Grid variants
    standard: { /* standard variant state */ },
    compact: { /* compact variant state */ },
    card: { /* card variant state */ },
    
    // Mixed variants
    sidebar: { /* sidebar variant state */ },
    showcase: { /* showcase variant state */ },
    newspaper: { /* newspaper variant state */ },
    magazine: { /* magazine variant state */ },
    videogrid: { /* videogrid variant state */ },
    
    // List variants
    chronological: { /* chronological variant state */ },
    
    // Other variants...
  };

  // Initial variant and state
  const initialVariantState = variantStates[initialVariant] || variantStates['standard'];

  // Return fully formed initial state
  return {
    pageId,
    blockType: template,
    blockPosition,
    articles: initialVariantState.articles,
    currentVariant: {
      variantType: initialVariantState.variantType,
      variantPosition: initialVariantState.variantPosition,
      config: initialVariantState.config
    },
    variantStates
  };
});
```

The initialization:
- Creates a default configuration for each supported variant
- Initializes the article collections for each column including the pool
- Sets up theme configurations with defaults optimized for each variant
- Establishes the initial state with the selected variant's settings

### Article Position Management

The hook provides a method to update article positions across columns:

```typescript
const updateArticlePositions = useCallback((newArticles: {[key: string]: Article[]}) => {
  setBlockState(prevState => {
    // Create new articles state
    const updatedArticles = {
      ...prevState.articles,
      ...newArticles
    };
    
    // Update the current variant state
    const updatedVariantStates = {
      ...prevState.variantStates,
      [prevState.currentVariant.variantType]: {
        ...prevState.variantStates[prevState.currentVariant.variantType],
        articles: updatedArticles
      }
    };
    
    // Create updated config
    const updatedConfig = {
      ...prevState.currentVariant.config,
      articles: Object.keys(updatedArticles).reduce((acc, key) => {
        acc[key] = updatedArticles[key]?.map(article => String(article.id)) || [];
        return acc;
      }, {} as Record<string, string[]>)
    };
    
    // Return the new state
    return {
      ...prevState,
      articles: updatedArticles,
      currentVariant: {
        ...prevState.currentVariant,
        config: updatedConfig
      },
      variantStates: updatedVariantStates
    };
  });
}, []);
```

This function:
- Immutably updates the articles in the specified columns
- Updates the current variant's article state and configuration
- Maintains the article IDs string representation for API communication
- Preserves state references that haven't changed to prevent unnecessary re-renders

### Variant Management

The hook provides methods to switch between different layout variants:

```typescript
const updateVariant = useCallback((newVariantType: VariantType) => {
  setBlockState(prevState => {
    // Get the new variant state
    const variantState = prevState.variantStates[newVariantType];
    
    if (!variantState) {
      console.error(`Variant "${newVariantType}" not found in variantStates`);
      return prevState;
    }
    
    // Return new state with updated variant
    return {
      ...prevState,
      articles: variantState.articles,
      currentVariant: {
        variantType: newVariantType,
        variantPosition: variantState.variantPosition,
        config: variantState.config
      }
    };
  });
}, []);
```

This ensures:
- Type-safe variant switching with error handling
- Automatic state propagation when changing variants
- Persistence of article positioning across variant changes
- Maintaining column-specific settings and configurations

### Configuration Updates

The hook allows for deep configuration updates:

```typescript
const updateBlockConfig = useCallback((newConfig: Partial<BlockConfig>) => {
  setBlockState(prevState => {
    // Merge the new config with the current config
    const updatedConfig = deepMerge(prevState.currentVariant.config, newConfig);
    
    // Update the variant state with the new config
    const updatedVariantStates = {
      ...prevState.variantStates,
      [prevState.currentVariant.variantType]: {
        ...prevState.variantStates[prevState.currentVariant.variantType],
        config: updatedConfig
      }
    };
    
    // Return the updated state
    return {
      ...prevState,
      currentVariant: {
        ...prevState.currentVariant,
        config: updatedConfig
      },
      variantStates: updatedVariantStates
    };
  });
}, []);
```

Key features include:
- Deep merging of nested configuration objects
- Preservation of untouched configuration values
- Variant-specific configuration management
- Update propagation to variant states for persistence

### API Format Generation

The hook provides a method to format the state for API communication:

```typescript
const getApiFormat = useCallback(() => {
  return {
    pageId: blockState.pageId,
    blockType: blockState.blockType,
    variantType: blockState.currentVariant.variantType,
    blockPosition: blockState.blockPosition,
    config: blockState.currentVariant.config
  };
}, [blockState]);
```

This transforms the internal state representation into a format suitable for API communication, ensuring:
- Only necessary data is transmitted
- Article objects are referenced by ID to minimize payload size
- Variant type information is clearly encoded
- Configuration settings are preserved in the correct format

## State Immutability Pattern

The hook implements a strict immutability pattern for state updates:

1. It creates copies of objects and arrays before modifying them
2. It maintains reference equality for unchanged objects
3. It updates nested objects in an immutable way
4. It preserves type safety throughout state transitions

Example pattern:
```typescript
setBlockState(prevState => {
  // Create shallow copies of objects to be modified
  const updatedObject = { ...objectToUpdate };
  
  // Modify the copied objects
  updatedObject.property = newValue;
  
  // Return a new state object with the modifications
  return {
    ...prevState,
    modifiedProperty: updatedObject,
    untouchedProperty: prevState.untouchedProperty // maintain reference
  };
});
```

## Common Usage Patterns

### Initializing the Hook

```typescript
const {
  blockState,
  updateArticlePositions,
  updateVariant,
  updateBlockConfig,
  getApiFormat
} = useBlockState({
  pageId: "page-123",
  template: "mixed",
  initialVariant: "magazine",
  initialArticles: articleData,
  blockPosition: 2
});
```

### Handling Drag and Drop

```typescript
const handleDragEnd = (result: DropResult) => {
  const { source, destination } = result;
  
  if (!destination) return;
  
  // Process drag and drop logic
  // ...
  
  // Update state with new article positions
  updateArticlePositions({
    [source.droppableId]: sourceCol,
    [destination.droppableId]: destCol
  });
};
```

### Saving State to API

```typescript
const handleSave = () => {
  const apiData = getApiFormat();
  
  // Send to API
  apiClient.saveBlockConfiguration(apiData)
    .then(response => {
      console.log('Configuration saved successfully');
    })
    .catch(error => {
      console.error('Error saving configuration', error);
    });
};
```

## Advanced Techniques

### State Persistence Between Renders

The hook maintains state between renders by:
1. Storing variant states in a nested object within the state
2. Retrieving and updating the correct variant state when switching variants
3. Persisting article positions and configurations per variant

This allows editors to switch between variants and maintain their work without losing progress.

### Optimistic Updates

The hook implements optimistic updates for article positioning:
1. Article position changes are applied immediately to the state
2. The UI reflects the change before API confirmation
3. If an error occurs, the previous state can be restored

### Column Constraints Enforcement

When updating article positions, the hook can enforce constraints:
1. Maximum number of articles per column
2. Column type validation
3. Content type compatibility with column purpose

This ensures layouts maintain their design integrity during editing.

## Error Handling

The hook implements several error handling patterns:

1. **Variant Validation**:
   ```typescript
   if (!variantState) {
     console.error(`Variant "${newVariantType}" not found in variantStates`);
     return prevState; // Return unchanged state
   }
   ```

2. **Type Guards**:
   ```typescript
   const isValidColumn = (columnId: string): columnId is ColumnId => {
     return Object.keys(currentVariant.maxItems).includes(columnId);
   };
   
   if (!isValidColumn(destination.droppableId)) {
     console.error(`Invalid column: ${destination.droppableId}`);
     return; // Early return
   }
   ```

3. **Fallback Values**:
   ```typescript
   const columnLimit = currentVariant.maxItems[columnId] || DEFAULT_COLUMN_LIMIT;
   ```

## Performance Optimizations

The hook implements several performance optimizations:

1. **Memoization**:
   - All state update methods are wrapped in `useCallback`
   - Derived data like API format is memoized

2. **Efficient Updates**:
   - Only updates columns that change during drag operations
   - Maintains reference equality for untouched objects

3. **Lazy Initialization**:
   - Uses the function form of `useState` for complex state initialization
   - Pre-computes default configurations only once at initialization

## Conclusion

The `useBlockState` hook is a sophisticated state management solution that:
- Provides a consistent interface for managing block layouts
- Implements immutable update patterns for predictable state transitions
- Maintains type safety through generic types and careful validation
- Optimizes rendering performance through strategic memoization
- Delivers flexible, extensible state management for complex UI components 