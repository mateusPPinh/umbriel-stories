# Mixed Block Manager Documentation

## Overview

The Mixed Block Manager component provides a robust drag and drop interface for managing articles in a dynamic layout. It supports multiple layout variants including Sidebar, Showcase, Newspaper, Magazine, and Video Grid.

## Architecture

- **Core Components:**
  - MixedManager: Manages the drag and drop functionality and configuration.
  - MixedLayoutPreview: Provides real-time preview of the layout based on variant.
  - ArticlesPool and DroppableColumn: Support the drag and drop of articles.
- **State Management:**
  - Uses the `useBlockState` hook to manage article positions and variant configurations.
- **Configuration:**
  - Layout configurations are defined in the `LAYOUT_VARIANTS` object. Each variant defines maximum items, column labels, and layout structures.

## Technical Deep Dive

### State Management with useBlockState Hook

The `useBlockState` hook is the central nervous system of the drag and drop functionality:

```typescript
const {
  blockState,
  updateArticlePositions,
  updateVariant,
  updateVariantPosition,
  updateBlockPosition,
  updateBlockConfig,
  getApiFormat
} = useBlockState({
  pageId,
  template: 'mixed',
  initialArticles: articles,
  initialVariant: variant as any,
  blockPosition: 1
});
```

Key details:
- Creates and maintains an immutable state object containing article positioning across columns
- Tracks variant-specific configurations in a nested `variantStates` object 
- Exposes specific action methods to modify state in controlled ways
- Automatically handles state normalization for API communication via `getApiFormat()`
- Maintains separate article collections for each column and the article pool

### Drag and Drop Algorithm

The drag and drop mechanism is powered by `@hello-pangea/dnd` and implements sophisticated validation logic:

```typescript
const handleDragEnd = (result: DropResult) => {
  const { source, destination } = result;
  
  // Early return conditions
  if (!destination) return;
  if (source.droppableId === destination.droppableId && source.index === destination.index) return;
  
  // Variant validation
  const variantType = blockState.currentVariant.variantType as LayoutVariant;
  if (!LAYOUT_VARIANTS[variantType]) {
    console.error(`Variante "${variantType}" não encontrada em LAYOUT_VARIANTS`);
    return;
  }
  
  // Column limit validation
  const currentVariant = LAYOUT_VARIANTS[variantType];
  const destColumn = destination.droppableId as ColumnId;
  
  if (
    source.droppableId !== destination.droppableId && 
    destColumn && 
    blockState.articles[destColumn] && 
    blockState.articles[destColumn].length >= currentVariant.maxItems[destColumn]
  ) {
    return; // Prevent move if destination column is full
  }
  
  // State update with careful reference handling
  const sourceCol = [...blockState.articles[source.droppableId]];
  const destCol = source.droppableId === destination.droppableId
    ? sourceCol
    : [...blockState.articles[destination.droppableId]];
  
  const [removed] = sourceCol.splice(source.index, 1);
  destCol.splice(destination.index, 0, removed);
  
  updateArticlePositions({
    ...blockState.articles,
    [source.droppableId]: sourceCol,
    [destination.droppableId]: destCol
  });
};
```

Technical considerations:
- Column limits are enforced at drag time rather than merely in the UI
- Careful handling of object references prevents unnecessary re-renders
- Error handling with appropriate console messages for debugging
- Uses dynamic type checking against the LAYOUT_VARIANTS object

### Layout Variant System

The Mixed Block Manager uses a type-safe variant system:

```typescript
type BaseColumnId = 'col-0' | 'col-1' | 'col-2';
type ColumnId = BaseColumnId;

type VariantConfig<T extends BaseColumnId[]> = {
  label: string;
  maxItems: { [K in T[number]]: number };
  columnLabels: { [K in T[number]]: string };
};

type LayoutVariants = {
  sidebar: VariantConfig<['col-0', 'col-1']>;
  showcase: VariantConfig<['col-0', 'col-1', 'col-2']>;
  newspaper: VariantConfig<['col-0', 'col-1', 'col-2']>;
  magazine: VariantConfig<['col-0', 'col-1', 'col-2']>;
  videogrid: VariantConfig<['col-0', 'col-1', 'col-2']>;
};
```

This provides:
- Type safety through TypeScript generics
- Automatic type inference for column IDs within each variant
- Strong validation when accessing configuration properties

### Column Prop Generation

A sophisticated `getColumnProps` function dynamically generates properties for each column based on the active variant:

```typescript
const getColumnProps = (colId: string) => {
  switch (validVariantType) {
    case 'sidebar':
      return {
        isSidebarMain: colId === 'col-0',
        isSidebarSide: colId === 'col-1',
        showExcerpt: colId === 'col-0' && blockConfig.styles.showExcerpt
      };
    case 'showcase':
      return {
        isFeatured: colId === 'col-0',
        isNewsFeedSide: colId === 'col-1',
        isCompact: colId === 'col-2',
        showExcerpt: blockConfig.styles.showExcerpt
      };
    // Other variant cases...
  }
};
```

This approach:
- Encapsulates display logic based on column position
- Integrates user configuration with layout structure
- Creates a clean interface for the preview component

## Drag and Drop Functionality

- Leverages the @hello-pangea/dnd library to handle drag and drop interactions.
- The `handleDragEnd` function validates moves and updates article positions accordingly.
- Enforces limits on the number of articles per column based on the active layout variant.

## Styling and Themes

- Supports both dark and light themes via the blockConfig styles.
- Dynamically adjusts typography and spacing for headings, subtitles, and images based on configuration.

## Usage

- Pass properties such as `pageId`, initial article data, and configuration objects to initialize the block.
- Use the variant selector to switch layouts and preview changes in real-time.
- Save updated configurations via the provided save button, which triggers state updates and API formatting.

## Supported Variants

- Sidebar
- Showcase
- Newspaper
- Magazine
- Video Grid

## Performance Considerations

- Uses React.memo to prevent unnecessary re-renders
- Maintains reference equality in state updates when possible
- Implements lazy loading for the configuration modal via React.Suspense
- Minimizes DOM operations by only updating changed columns
