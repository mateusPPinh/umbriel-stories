# Newspaper Block Manager Documentation

## Overview

The Newspaper variant of the Block Manager arranges articles in a layout resembling traditional newspaper columns. It is designed to highlight multiple articles by grouping them into main, secondary, and tertiary sections.

## Architecture

- **Core Components:**
  - Derived from MixedManager and MixedLayoutPreview, with Newspaper-specific configurations.
  - Uses DroppableColumn to render columns with distinct types: main, secondary, and tertiary.
  - ArticlesPool facilitates reordering and reassigning articles.

- **State Management:**
  - Leverages the `useBlockState` hook to manage article positions within columns and handle state updates upon drag and drop events.

- **Configuration:**
  - The `LAYOUT_VARIANTS` object includes a Newspaper variant, which defines:
    - Maximum items per column (e.g., 2 for main articles, 4 for secondary and tertiary columns).
    - Column labels to indicate the type of content displayed.

## Technical Deep Dive

### Layout Structure & Configuration

The Newspaper layout is defined in the LAYOUT_VARIANTS object with the following structure:

```typescript
newspaper: {
  label: 'Jornal / Notícias',
  maxItems: {
    'col-0': 2,
    'col-1': 4,
    'col-2': 4
  },
  columnLabels: {
    'col-0': 'Principais',
    'col-1': 'Secundárias',
    'col-2': 'Terciárias'
  }
}
```

This configuration:
- Limits the main column (col-0) to 2 articles for high-visibility content
- Allows up to 4 articles in secondary columns (col-1 and col-2)
- Provides semantic labels that convey the editorial hierarchy

### Column Style Logic

The Newspaper variant applies specific styling properties to each column through the `getColumnProps` function:

```typescript
case 'newspaper':
  return {
    isNewsFeedMain: colId === 'col-0', // 2 artigos principais em lista vertical
    isCompact: colId === 'col-1' || colId === 'col-2', // 4 artigos em lista vertical, só título e descrição
    hasBorder: colId === 'col-1' || colId === 'col-2', // Borda à esquerda nas colunas 2 e 3
    showExcerpt: blockConfig.styles.showExcerpt
  };
```

These properties influence:
- Visual weight of articles (main vs compact)
- Vertical spacing and border treatments
- Conditional excerpt display based on user configuration

### Rendering Implementation

In the MixedLayoutPreview component, the Newspaper layout is rendered with a specialized function:

```typescript
const renderNewspaperPreview = () => {
  // Column class calculation for responsive grid
  const mainColClass = 'col-span-12 md:col-span-6 lg:col-span-4';
  const secondaryColClass = 'col-span-12 md:col-span-3 lg:col-span-4';
  
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Main column with large headlines */}
      <div className={mainColClass}>
        {renderColumnArticles('col-0', {
          isNewsFeedMain: true,
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
      
      {/* Secondary columns with compact styling */}
      <div className={secondaryColClass}>
        {renderColumnArticles('col-1', {
          isCompact: true,
          hasBorder: true,
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
      
      <div className={secondaryColClass}>
        {renderColumnArticles('col-2', {
          isCompact: true,
          hasBorder: true,
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
    </div>
  );
};
```

Key implementation details:
- Uses CSS Grid with a 12-column system for responsive layout
- Allocates different column spans based on viewport size
- Applies specific border styling to visually separate columns

### State Initialization

When initializing a Newspaper layout, the state is structured specifically for its column arrangement:

```typescript
newspaper: {
  variantType: 'newspaper' as VariantType,
  variantPosition: 1,
  articles: {
    'pool': initialArticles,
    'col-0': [],
    'col-1': [],
    'col-2': []
  },
  config: {
    // Default configuration object with empty columns
    articles: {
      'pool': initialArticles.map(article => String(article.id)),
      'col-0': [],
      'col-1': [],
      'col-2': []
    }
    // Other config properties...
  }
}
```

This initialization ensures:
- All articles start in the pool for editor selection
- Empty columns are properly initialized with arrays
- Article IDs are properly mapped to strings in the config object

## Drag and Drop Functionality

- Utilizes the @hello-pangea/dnd library to enable intuitive drag and drop interactions.
- The `handleDragEnd` function checks for valid moves between the newspaper columns and updates the state accordingly.
- Enforces column limits to maintain the intended layout structure.

## Styling and Themes

- Supports dark and light themes through configurable style parameters.
- Typography and spacing are adjusted based on the theme using values from the blockConfig.

## Usage

- Initialize with article data, a pageId, and a configuration object.
- Use the drag and drop interface to rearrange articles within the defined columns.
- Save the configuration to maintain updates via an API call triggered on save action.

## Customization

- Developers can tweak column limits, labels, and themes by modifying the `LAYOUT_VARIANTS` Newspaper settings.
- Additional hooks and utility functions allow for further customization of the drag and drop behavior.

## Best Practices

- Place feature articles with strong imagery in the main column (col-0)
- Use secondary columns for supporting content with concise headlines
- Maintain visual hierarchy by limiting the number of articles in each column
- Consider text length in compact columns as space is limited 