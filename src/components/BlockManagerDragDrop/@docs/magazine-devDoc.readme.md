# Magazine Block Manager Documentation

## Overview

The Magazine variant offers a dynamic layout specifically designed for content-rich presentation, blending large visuals with multiple secondary articles. It is ideal for storytelling and engaging layouts commonly found in magazine-style designs.

## Architecture

- **Core Components:**
  - Based on MixedManager and MixedLayoutPreview with Magazine-specific settings.
  - Uses DroppableColumn to manage articles arranged in main, secondary, and tertiary areas.
  - ArticlesPool supports recycling articles between the layout and the content library.

- **State Management:**
  - Utilizes the `useBlockState` hook to manage state related to article positions and variant configurations.

- **Configuration:**
  - The Magazine variant in the `LAYOUT_VARIANTS` object specifies:
    - Maximum items allowed per column (e.g., one main article, three secondary, and four tertiary articles).
    - Custom column labels corresponding to the visual hierarchy needed for magazine layouts.

## Technical Deep Dive

### Layout Structure & Configuration

The Magazine layout is defined in the LAYOUT_VARIANTS object with the following structure:

```typescript
magazine: {
  label: 'Revista',
  maxItems: {
    'col-0': 1,  // Destaque principal
    'col-1': 3,  // Destaques secundários
    'col-2': 4   // Artigos terciários
  },
  columnLabels: {
    'col-0': 'Principal',
    'col-1': 'Secundários',
    'col-2': 'Adicionais'
  }
}
```

This configuration:
- Reserves the main column (col-0) for a single feature article with prominent display
- Allocates space for three secondary highlights in col-1 with medium prominence
- Allows four tertiary articles in col-2 with more compact presentation
- Uses semantic labels that reflect the intended editorial hierarchy

### Column Style Properties

The Magazine variant implements specific styling through the `getColumnProps` function:

```typescript
case 'magazine':
  return {
    isMagazineMain: colId === 'col-0',     // Artigo principal
    isMagazineSecondary: colId === 'col-1', // Artigos secundários com imagem
    isMagazineTertiary: colId === 'col-2',  // Artigos terciários com imagem
    showExcerpt: blockConfig.styles.showExcerpt && colId !== 'col-2'
  };
```

These properties control:
- Visual hierarchy through component selection and sizing
- Conditional rendering of excerpts based on column type
- Image size and treatment specific to magazine-style layouts
- Custom typography scaling for main vs. secondary content

### Rendering Implementation

The magazine layout uses a sophisticated grid system with asymmetrical column spans:

```typescript
const renderMagazinePreview = () => {
  // Column classes for responsive grid layout
  const mainColClass = 'col-span-12 md:col-span-6';
  const secondaryColClass = 'col-span-12 md:col-span-6';
  const tertiaryColClass = 'col-span-12 md:col-span-3';
  
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Main feature article in large format */}
      <div className={mainColClass}>
        {renderColumnArticles('col-0', {
          isMagazineMain: true,
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
      
      {/* Secondary column with medium-sized articles */}
      <div className={`${secondaryColClass} grid grid-cols-1 gap-4`}>
        {renderColumnArticles('col-1', {
          isMagazineSecondary: true,
          showExcerpt: blockConfig.styles.showExcerpt
        })}
      </div>
      
      {/* Tertiary articles in smaller format, arranged in grid */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {renderColumnArticles('col-2', {
          isMagazineTertiary: true,
          showExcerpt: false
        })}
      </div>
    </div>
  );
};
```

Key implementation details:
- Implements a nested grid system for flexible article arrangement
- Uses asymmetrical column spans to create visual interest
- Responsive design patterns that adapt across device sizes
- Specialized article rendering based on column position

### Article Component Rendering 

For each column type, specific article components are rendered:

```typescript
// Main article rendering (simplified)
const renderMagazineMainArticle = (article: Article) => {
  return (
    <div className="magazine-main-article">
      <div className="magazine-main-image">
        {renderImage(article.featuredImage, {
          aspectRatio: '16:9',
          objectFit: 'cover',
          width: '100%'
        })}
      </div>
      <div className="magazine-main-content">
        <h2 className={getHeadingClasses('xl')}>{article.title}</h2>
        {blockConfig.styles.showExcerpt && article.excerpt && (
          <p className={getSubtitleClasses('md')}>{article.excerpt}</p>
        )}
        {renderMetadata(article)}
      </div>
    </div>
  );
};

// Secondary article rendering (simplified)
const renderMagazineSecondaryArticle = (article: Article) => {
  return (
    <div className="magazine-secondary-article">
      <div className="magazine-secondary-image">
        {renderImage(article.featuredImage, {
          aspectRatio: '3:2',
          objectFit: 'cover'
        })}
      </div>
      <div className="magazine-secondary-content">
        <h3 className={getHeadingClasses('lg')}>{article.title}</h3>
        {blockConfig.styles.showExcerpt && article.excerpt && (
          <p className={getSubtitleClasses('sm')}>{article.excerpt}</p>
        )}
      </div>
    </div>
  );
};

// Tertiary article rendering (simplified)
const renderMagazineTertiaryArticle = (article: Article) => {
  return (
    <div className="magazine-tertiary-article">
      <div className="magazine-tertiary-image">
        {renderImage(article.featuredImage, {
          aspectRatio: '1:1',
          objectFit: 'cover'
        })}
      </div>
      <h4 className={getHeadingClasses('sm')}>{article.title}</h4>
    </div>
  );
};
```

Each component implements:
- Specific aspect ratios optimized for the content type
- Tailored typography scales based on hierarchy
- Conditional metadata display
- Custom hover states and interaction patterns

### State Initialization and Loading

When the Magazine variant is initialized, the state structure follows this pattern:

```typescript
magazine: {
  variantType: 'magazine' as VariantType,
  variantPosition: 1,
  articles: {
    'pool': initialArticles,
    'col-0': [],
    'col-1': [],
    'col-2': []
  },
  config: {
    ...defaultConfig,
    articles: {
      'pool': initialArticles.map(article => String(article.id)),
      'col-0': [],
      'col-1': [],
      'col-2': []
    },
    styles: {
      ...defaultConfig.styles,
      showExcerpt: true,
      theme: {
        light: {
          ...defaultLightTheme,
          headingProps: {
            fontSize: { 
              col0: 'xl', 
              col1: 'lg', 
              col2: 'md' 
            },
            fontWeight: 'bold',
            color: '#1a1a1a'
          }
        },
        dark: {
          ...defaultDarkTheme,
          headingProps: {
            fontSize: { 
              col0: 'xl', 
              col1: 'lg', 
              col2: 'md' 
            },
            fontWeight: 'bold',
            color: '#ffffff'
          }
        }
      }
    }
  }
}
```

This initialization ensures:
- Correct column setup for the magazine layout structure
- Theme configurations optimized for magazine presentation
- Different typography scales per column
- Preservation of article pools for editor usage

### Data Persistence and API Format

The magazine variant's state is transformed into a specific format for API persistence:

```typescript
// Simplified version of the API format generation
const getApiFormat = () => {
  const { currentVariant, articles } = blockState;
  
  return {
    pageId,
    blockType: 'mixed',
    variantType: currentVariant.variantType,
    blockPosition: blockState.blockPosition,
    config: {
      ...currentVariant.config,
      articles: {
        'pool': articles.pool.map(a => a.id),
        'col-0': articles['col-0'].map(a => a.id),
        'col-1': articles['col-1'].map(a => a.id),
        'col-2': articles['col-2'].map(a => a.id)
      }
    }
  };
};
```

This format:
- Preserves only the necessary data for recreation
- Converts article objects to ID references for efficient storage
- Maintains configuration metadata including styling preferences
- Ensures proper reconstruction of the layout when reloaded

## Drag and Drop Functionality

- Employs the @hello-pangea/dnd library for drag and drop functionality.
- The drag end logic verifies moves according to the Magazine variant rules and updates article positions in real-time.

## Styling and Themes

- Provides support for both dark and light themes, using style settings from blockConfig.
- Typography, spacing, and image display properties are tailored to enhance the magazine presentation.

## Usage

- Initialize the Magazine Block Manager with relevant article data, page ID, and block configuration.
- Use the interface to drag and drop articles, automatically rearranging them based on the predetermined Magazine layout.
- Save changes to persist the new arrangement, typically interacting with backend APIs to update state.

## Customization

- Developers can modify the maximum items per column, labels, and style configurations in the Magazine variant settings.
- The system supports extension through hooks, allowing further custom interactions with the magazine layout.

## Best Practices

- Feature only one main article with strong visual appeal in the primary column
- Maintain consistent image aspect ratios within each column type
- Use the tertiary column for shorter articles that don't require excerpts
- Consider the visual rhythm created by the asymmetrical grid layout

## Performance Considerations 

- Implements conditional rendering to prevent unnecessary DOM operations
- Uses CSS Grid for layout which provides better performance than flexbox for complex layouts
- Optimizes image loading with proper sizing and lazy loading
- Minimizes state updates by batching column changes 