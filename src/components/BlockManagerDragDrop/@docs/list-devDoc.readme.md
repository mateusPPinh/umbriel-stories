# List Block Manager Documentation

## Overview

The List Block Manager provides a streamlined drag and drop interface for managing articles in a simple list layout. This layout is ideal for scenarios where articles are displayed in a vertical sequence, making it easy to reorder content.

## Architecture

- **Core Components:**
  - ListManager (hypothetical): Manages the drag and drop functionality and article ordering for the list layout.
  - ListLayoutPreview (hypothetical): Provides real-time preview of the list layout based on configuration.
  - ArticlesPool and ListItem: Facilitate the drag and drop of articles within the list.

- **State Management:**
  - Typically uses a state hook (comparable to `useBlockState`) to track article order and handle state updates upon drag and drop interactions.

- **Configuration:**
  - Custom configuration allows adjustments to styling, spacing, and the presentation of article details (e.g., title, subtitle, publish date).

## Technical Deep Dive

### List Variants System

The List Block Manager supports three distinct variants, each with its own presentation style:

```typescript
const LAYOUT_VARIANTS = {
  chronological: {
    label: 'Cronológico',
    maxItems: 10
  },
  compact: {
    label: 'Compacto',
    maxItems: 10
  },
  card: {
    label: 'Cartão',
    maxItems: 10
  }
};
```

Key differences:
- **Chronological**: Articles arranged with timestamps and potential visual timeline indicators
- **Compact**: Minimalist design focused on title and essential metadata
- **Card**: Grid-based layout with each article in a contained card with optional hover effects

### Configuration Object Structure

The List Block Manager uses a sophisticated configuration object with extensive customization options:

```typescript
interface ListBlockConfig {
  articles: Record<string, Article[]>;
  variant?: 'chronological' | 'compact' | 'card';
  layout: {
    columns: number;
    gap: string;
    styles: {
      grid: {
        autoRows: string;
        templateColumns: string;
      };
      width: string;
      columnStyles: Record<string, any>;
      backgroundColor: string;
      gridFlow?: string;
      minColumnWidth?: string;
    };
    padding: string;
    imageSize: string;
    responsive: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    aspectRatio: string;
  };
  styles: {
    // Theme configurations
    showExcerpt: boolean;
    showMetadata: boolean;
    titleSize: string;
    columnStyle: Record<string, any>;
    imageHeight: string;
    timelineStyle?: 'solid' | 'dashed' | 'dotted';
    markerStyle?: 'circle' | 'square' | 'diamond';
    hoverEffect?: 'highlight' | 'scale' | 'background' | 'translate' | 'none';
    dividerStyle?: 'solid' | 'dashed' | 'dotted';
    thumbnailShape?: 'square' | 'rounded' | 'circle';
  };
}
```

This configuration provides:
- Responsive layout control through breakpoint-specific column counts
- Visual styling for timeline markers and dividers (in chronological view)
- Interactive hover effects for enhanced user experience
- Flexible thumbnail styling and image presentation options

### Single-Column Drag and Drop Logic

Unlike multi-column layouts, the List Manager implements a simplified drag and drop pattern:

```typescript
const handleDragEnd = (result: DropResult) => {
  const { source, destination } = result;

  // Early return for invalid moves
  if (!destination) return;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) return;

  // For list, we operate on a single column
  const columnId = 'col-0';
  
  // Handle moves between pool and list
  if (source.droppableId === 'pool' && destination.droppableId === columnId) {
    // Move from pool to list
    const sourceCol = [...blockState.articles.pool];
    const destCol = [...blockState.articles[columnId]];
    
    const [removed] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, removed);
    
    updateArticlePositions({
      ...blockState.articles,
      pool: sourceCol,
      [columnId]: destCol
    });
  } else if (source.droppableId === columnId && destination.droppableId === 'pool') {
    // Move from list back to pool
    const sourceCol = [...blockState.articles[columnId]];
    const destCol = [...blockState.articles.pool];
    
    const [removed] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, removed);
    
    updateArticlePositions({
      ...blockState.articles,
      [columnId]: sourceCol,
      pool: destCol
    });
  } else if (source.droppableId === columnId && destination.droppableId === columnId) {
    // Reordering within the list
    const sourceCol = [...blockState.articles[columnId]];
    const [removed] = sourceCol.splice(source.index, 1);
    sourceCol.splice(destination.index, 0, removed);
    
    updateArticlePositions({
      ...blockState.articles,
      [columnId]: sourceCol
    });
  }
};
```

Technical considerations:
- Works with a single target column (`col-0`) for simplicity
- Handles three distinct scenarios: add from pool, return to pool, and reorder
- Maintains reference equality where possible to prevent unnecessary re-renders

### Layout Preview Rendering

The ListLayoutPreview component renders articles according to the selected variant:

```typescript
const renderArticles = () => {
  const articles = blockState.articles['col-0'] || [];
  const listClasses = getListClasses(variant);
  
  return (
    <div className={listClasses.container}>
      {articles.map((article, index) => (
        <article key={article.id} className={listClasses.item}>
          {variant === 'chronological' && (
            <div className={listClasses.timeline}>
              <div 
                className={listClasses.marker} 
                style={{ 
                  shape: blockConfig.styles.markerStyle || 'circle' 
                }} 
              />
              <div 
                className={listClasses.line}
                style={{ 
                  borderStyle: blockConfig.styles.timelineStyle || 'solid' 
                }}
              />
            </div>
          )}
          
          <div className={listClasses.content}>
            {/* Article content rendering based on variant */}
          </div>
        </article>
      ))}
    </div>
  );
};
```

Rendering features:
- Specialized timeline visualization for chronological variant
- CSS class composition based on the selected variant
- Conditional rendering of elements based on configuration flags

## Drag and Drop Functionality

- Utilizes a drag and drop library (such as @hello-pangea/dnd) for intuitive article rearrangement.
- The drag end handler verifies changes and updates the order of articles in the list.
- Supports removal of articles and reinsertion into the pool for reuse.

## Styling and Themes

- Supports both dark and light themes with customizable style configurations.
- Allows configuration of typography settings, spacing, and display properties such as showing/hiding images or subtitles.

## Usage

- Initialize the List Block Manager with a set of article data and configuration options.
- Use drag and drop gestures to reorder articles as needed.
- Changes are immediately previewed, and updates can be saved to persist the arrangement.

## Customization

- Developers can extend or modify the default behavior by adjusting the configuration, theme settings, and component structure.
- Hooks and utility functions are provided to facilitate custom interactions or integrations.

## Performance Considerations

- Uses single-column architecture for improved drag and drop performance
- Minimizes state updates by handling operations at the list level rather than individual item level
- Supports virtualization for large article lists to maintain smooth scrolling and interactions 