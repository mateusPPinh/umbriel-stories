# Shared Components Documentation

## Overview

The BlockManagerDragDrop system utilizes several shared components that provide consistent functionality across different block variants. These components create the foundation for all layout types and establish unified interaction patterns.

## Core Shared Components

### ArticlesPool

The ArticlesPool component serves as a container for all available articles that haven't been assigned to specific columns in the layout.

```typescript
interface ArticlesPoolProps {
  articles: Article[];
  isDarkTheme?: boolean;
  isCompact?: boolean;
  blockConfig: BlockConfig;
}

const ArticlesPool: React.FC<ArticlesPoolProps> = ({
  articles,
  isDarkTheme = false,
  isCompact = false,
  blockConfig
}) => {
  const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
  
  return (
    <Droppable droppableId="pool">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="articles-pool"
          style={{
            backgroundColor: theme.columnStyle.background,
            padding: theme.columnStyle.padding || '16px'
          }}
        >
          <h3 className="pool-heading">Artigos disponíveis</h3>
          
          {articles.length === 0 ? (
            <div className="empty-pool-message">
              Todos os artigos foram posicionados no layout
            </div>
          ) : (
            <div className="pool-items">
              {articles.map((article, index) => (
                <Draggable
                  key={article.id}
                  draggableId={`pool-${article.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`pool-item ${snapshot.isDragging ? 'is-dragging' : ''}`}
                    >
                      <ArticlePoolItem
                        article={article}
                        isCompact={isCompact}
                        theme={theme}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
          
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
```

Key features:
- Implements a droppable container for holding unused articles
- Renders each article with consistent styling for easy identification
- Provides visual feedback during drag operations
- Adapts to theme configurations for visual consistency
- Shows empty state messaging when all articles are in use

### DroppableColumn

The DroppableColumn component represents a target column in any layout variant, handling article placement and visualization.

```typescript
interface DroppableColumnProps {
  columnId: string;
  articles: Article[];
  isDarkTheme?: boolean;
  label?: string;
  maxItems?: number;
  blockConfig: BlockConfig;
  renderPreviewItem: (article: Article, index: number) => React.ReactNode;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  columnId,
  articles = [],
  isDarkTheme = false,
  label,
  maxItems = Infinity,
  blockConfig,
  renderPreviewItem
}) => {
  const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
  const isFull = maxItems !== Infinity && articles.length >= maxItems;
  
  return (
    <Droppable droppableId={columnId} isDropDisabled={isFull}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`droppable-column ${isFull ? 'is-full' : ''} ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
          style={{
            backgroundColor: theme.columnStyle.background,
            padding: theme.columnStyle.padding || '16px'
          }}
        >
          {label && (
            <div className="column-header">
              <h3>{label}</h3>
              <span className="item-counter">
                {articles.length}/{maxItems !== Infinity ? maxItems : '∞'}
              </span>
            </div>
          )}
          
          <div className="column-items">
            {articles.map((article, index) => (
              <Draggable
                key={article.id}
                draggableId={`${columnId}-${article.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`column-item ${snapshot.isDragging ? 'is-dragging' : ''}`}
                  >
                    <div className="drag-handle" {...provided.dragHandleProps}>
                      <DragHandleIcon />
                    </div>
                    
                    {renderPreviewItem(article, index)}
                    
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveArticle(columnId, article.id)}
                      aria-label="Remove article"
                    >
                      <RemoveIcon />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          
          {isFull && (
            <div className="column-full-message">
              Coluna cheia (máximo: {maxItems})
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};
```

Key features:
- Implements a droppable container that can be disabled when full
- Provides column header with counter showing capacity
- Renders each article with custom preview based on the layout variant
- Includes drag handles and remove buttons for article manipulation
- Shows visual state feedback during interactions
- Adapts to theme configuration for visual consistency

### StyleConfigModal

The StyleConfigModal component provides a unified interface for configuring block styles across variants.

```typescript
interface StyleConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: BlockConfig) => void;
  currentConfig: BlockConfig;
  blockType: BlockType;
  variantType: VariantType;
}

export interface BlockConfig {
  layout: LayoutConfig;
  articles: Record<string, string[]>;
  styles: StylesConfig;
  mediaConfig?: MediaConfig;
  videoConfig?: VideoConfig;
}

const StyleConfigModal: React.FC<StyleConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentConfig,
  blockType,
  variantType
}) => {
  // Local state for config changes
  const [config, setConfig] = useState<BlockConfig>(currentConfig);
  
  // Reset local state when modal opens or config changes
  useEffect(() => {
    setConfig(currentConfig);
  }, [currentConfig, isOpen]);
  
  // Update a specific config section
  const updateConfig = (section: keyof BlockConfig, values: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values
      }
    }));
  };
  
  const handleSave = () => {
    onSave(config);
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurações de Estilo">
      <div className="config-sections">
        {/* Layout settings section */}
        <ConfigSection title="Layout">
          <LayoutConfig
            config={config.layout}
            onChange={(values) => updateConfig('layout', values)}
            blockType={blockType}
          />
        </ConfigSection>
        
        {/* Theme settings section */}
        <ConfigSection title="Tema">
          <ThemeConfig
            config={config.styles.theme}
            onChange={(values) => updateConfig('styles', { theme: values })}
          />
        </ConfigSection>
        
        {/* Media settings section */}
        <ConfigSection title="Mídia">
          <MediaConfig
            config={config.mediaConfig || {}}
            onChange={(values) => updateConfig('mediaConfig', values)}
            blockType={blockType}
            variantType={variantType}
          />
        </ConfigSection>
        
        {/* Video settings section - conditionally rendered */}
        {variantType === 'videogrid' && (
          <ConfigSection title="Configurações de Vídeo">
            <VideoConfig
              config={config.videoConfig || {}}
              onChange={(values) => updateConfig('videoConfig', values)}
            />
          </ConfigSection>
        )}
        
        {/* Content display options */}
        <ConfigSection title="Conteúdo">
          <ContentDisplayConfig
            config={config.styles}
            onChange={(values) => updateConfig('styles', values)}
            blockType={blockType}
          />
        </ConfigSection>
      </div>
      
      <div className="modal-actions">
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Salvar</Button>
      </div>
    </Modal>
  );
};
```

Key features:
- Provides a centralized configuration interface for all block variants
- Implements section-based settings with controlled forms
- Conditionally renders settings based on block type and variant
- Preserves configuration state during editing
- Uses controlled component pattern for form state management
- Implements clean save and cancel behavior with proper state handling

### ArticlePreview

The ArticlePreview component renders article previews with consistent styling based on configuration:

```typescript
interface ArticlePreviewProps {
  article: Article;
  theme: ThemeConfig;
  displayConfig: DisplayConfig;
  variant: VariantType;
  columnProps?: Record<string, any>;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  article,
  theme,
  displayConfig,
  variant,
  columnProps = {}
}) => {
  // Determine heading and content classes based on theme, variant and column props
  const headingClassName = getHeadingClasses(
    theme.headingProps.fontSize,
    theme.headingProps.fontWeight
  );
  
  const subtitleClassName = getSubtitleClasses(
    theme.subtitleProps.fontSize
  );
  
  // Handle image display based on configuration
  const renderImage = () => {
    if (!displayConfig.showImage || !article.featuredImage) {
      return null;
    }
    
    return (
      <div 
        className={`article-image ${getImageClasses(variant, columnProps)}`}
        style={{
          backgroundImage: `url(${article.featuredImage})`,
          aspectRatio: getAspectRatio(variant, columnProps)
        }}
      />
    );
  };
  
  // Handle metadata display
  const renderMetadata = () => {
    if (!displayConfig.showPublishDate && !displayConfig.showAuthor && !displayConfig.showCategory) {
      return null;
    }
    
    return (
      <div className="article-metadata">
        {displayConfig.showCategory && article.category && (
          <span className="article-category">{article.category}</span>
        )}
        
        {displayConfig.showPublishDate && article.publishDate && (
          <time className="article-date">{formatDate(article.publishDate)}</time>
        )}
        
        {displayConfig.showAuthor && article.author && (
          <span className="article-author">Por {article.author}</span>
        )}
      </div>
    );
  };
  
  // Handle article rendering based on variant and column props
  const getArticleClassNames = () => {
    let classNames = 'article-preview';
    
    // Add variant-specific classes
    if (columnProps.isFeatured) classNames += ' is-featured';
    if (columnProps.isCompact) classNames += ' is-compact';
    if (columnProps.isSidebarMain) classNames += ' is-sidebar-main';
    // ... other conditional classes
    
    return classNames;
  };
  
  return (
    <article className={getArticleClassNames()}>
      {renderImage()}
      
      <div className="article-content">
        <h3 className={headingClassName} style={{ color: theme.headingProps.color }}>
          {article.title}
        </h3>
        
        {displayConfig.showSubtitle && article.subtitle && (
          <h4 className={subtitleClassName} style={{ color: theme.subtitleProps.color }}>
            {article.subtitle}
          </h4>
        )}
        
        {columnProps.showExcerpt && article.excerpt && (
          <p className="article-excerpt">{article.excerpt}</p>
        )}
        
        {renderMetadata()}
      </div>
    </article>
  );
};
```

Key features:
- Renders article content with consistent styling
- Adapts to layout variant and column position
- Implements conditional rendering based on configuration
- Handles various article data structures
- Applies theme settings to typography and colors
- Optimizes image display with proper aspect ratios

## Utility Components

### VariantSelector

The VariantSelector component provides a consistent interface for switching between layout variants:

```typescript
interface VariantSelectorProps {
  variants: Record<string, { label: string }>;
  currentVariant: string;
  onChange: (variant: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  currentVariant,
  onChange
}) => {
  return (
    <div className="variant-selector">
      <label className="variant-label">Layout:</label>
      <div className="variant-options">
        {Object.entries(variants).map(([key, { label }]) => (
          <button
            key={key}
            className={`variant-option ${currentVariant === key ? 'is-active' : ''}`}
            onClick={() => onChange(key)}
            aria-pressed={currentVariant === key}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
```

### EmptyState

The EmptyState component provides a consistent interface for displaying empty state messages:

```typescript
interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <p className="empty-state-message">{message}</p>
      {actionLabel && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};
```

## Integration Patterns

### Component Composition

The shared components are designed to be composed together to create complex layouts:

```typescript
// Simplified example of component composition
const LayoutManager = () => {
  // State and handlers
  
  return (
    <div className="layout-manager">
      <div className="layout-configuration">
        <VariantSelector
          variants={LAYOUT_VARIANTS}
          currentVariant={blockState.currentVariant.variantType}
          onChange={updateVariant}
        />
        <Button onClick={handleConfigOpen}>Configurar</Button>
      </div>
      
      <div className="layout-editor">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="layout-columns">
            {availableColumns.map(columnId => (
              <DroppableColumn
                key={columnId}
                columnId={columnId}
                articles={blockState.articles[columnId] || []}
                isDarkTheme={isDarkTheme}
                label={currentVariant.columnLabels[columnId]}
                maxItems={currentVariant.maxItems[columnId]}
                blockConfig={blockConfig}
                renderPreviewItem={(article, index) => (
                  <ArticlePreview
                    article={article}
                    theme={theme}
                    displayConfig={getColumnDisplayConfig(columnId)}
                    variant={blockState.currentVariant.variantType}
                    columnProps={getColumnProps(columnId)}
                  />
                )}
              />
            ))}
          </div>
          
          <ArticlesPool
            articles={blockState.articles.pool || []}
            isDarkTheme={isDarkTheme}
            blockConfig={blockConfig}
          />
        </DragDropContext>
      </div>
      
      <div className="layout-preview">
        <LayoutPreview
          columns={blockState.articles}
          variant={blockState.currentVariant.variantType}
          isDarkTheme={isDarkTheme}
          blockConfig={blockConfig}
        />
      </div>
      
      <StyleConfigModal
        isOpen={isConfigModalOpen}
        onClose={handleConfigClose}
        onSave={handleConfigSave}
        currentConfig={blockConfig}
        blockType={blockType}
        variantType={blockState.currentVariant.variantType}
      />
    </div>
  );
};
```

### Prop Forwarding Pattern

Shared components implement a prop forwarding pattern to allow specialization:

```typescript
// Example of prop forwarding between components
const SpecializedArticlePreview = (props) => {
  // Add specialized behavior
  const enhancedProps = {
    ...props,
    columnProps: {
      ...props.columnProps,
      // Add specialized properties
      isSpecial: true,
      enhancedTypography: true
    }
  };
  
  return <ArticlePreview {...enhancedProps} />;
};
```

## Best Practices for Extending Shared Components

1. **Use composition over inheritance**:
   ```typescript
   // Good
   const EnhancedPreview = (props) => (
     <div className="enhanced-wrapper">
       <ArticlePreview {...props} />
       <AdditionalFeature />
     </div>
   );
   
   // Avoid
   class EnhancedPreview extends ArticlePreview {
     // Extended implementation
   }
   ```

2. **Extend functionality through props**:
   ```typescript
   <DroppableColumn
     {...baseProps}
     renderPreviewItem={(article, index) => (
       <CustomArticlePreview
         article={article}
         index={index}
         customFeature={true}
       />
     )}
   />
   ```

3. **Keep consistent theme usage**:
   ```typescript
   // Access theme consistently
   const theme = blockConfig.styles.theme[isDarkTheme ? 'dark' : 'light'];
   
   // Apply theme properties consistently
   <h3 style={{ 
     fontSize: theme.headingProps.fontSize,
     fontWeight: theme.headingProps.fontWeight,
     color: theme.headingProps.color
   }}>
     {title}
   </h3>
   ```

4. **Maintain proper type definitions**:
   ```typescript
   // Export proper interfaces
   export interface ArticlePreviewProps {
     // prop definitions
   }
   
   // Use them when extending
   interface EnhancedPreviewProps extends ArticlePreviewProps {
     enhancedFeature: boolean;
   }
   ```

## Conclusion

The shared component architecture in BlockManagerDragDrop provides:
- Consistent behavior across different layout variants
- Reusable interaction patterns for drag-and-drop operations
- Centralized configuration management
- Theme-aware rendering
- Extensible composition patterns
- Type-safe interfaces for all components

By understanding and leveraging these shared components, developers can create new layout variants, extend existing ones, or customize behavior while maintaining consistency across the entire system. 